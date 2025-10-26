const express = require('express');
const path = require('path');
const router = express.Router();
const pkg = require('pg')
const bcrypt = require('bcrypt');
router.use(express.static(path.join(__dirname, '../public'))); // for asset if want to render ejs

const { DB_CONFIG, FRONTEND_URL, RELEASE_MODE, SECRET_KEY } = require('../config/config.js');
const { table, log } = require('console');

const { Pool } = pkg; // extract Pool from pg package
const pool = new Pool(DB_CONFIG);

async function query(sql, params = []) {
    try {
        const result = await pool.query(sql, params);
        return result.rows;
    } catch (err) {
        console.error("Database query error:", err.stack);
    }
}

// wrapper for inserting new user or admin
async function insertNew(tableName, unique_name, password, name) {
    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            if (tableName === 'admins') {
                insertText = 'INSERT INTO admins(username, name, password) VALUES($1, $2, $3)';
                const hashedPassword = await bcrypt.hash(password, 10); // hash the password
                insertValues = [unique_name, name, hashedPassword];
            } else {
                insertText = 'INSERT INTO users(unique_name, name, point) VALUES($1, $2, $3)';
                insertValues = [unique_name, name, 0]; // point = 0 at the beginning
            }
            await client.query(insertText, insertValues);
            await client.query('COMMIT');
            return { success: true, message: 'New user added successfully' };
        } catch (err) {
            await client.query('ROLLBACK');
            console.error("Transaction error:", err.stack);
            return { success: false, error: err.message };
        } finally {
            client.release();
        }
    } catch (err) {
        console.error("Connection error:", err.stack);
        return { success: false, error: err.message };
    }
}

async function updatePoints(unique_name, scale) {
    // first get current points
    const userData = await query('SELECT point FROM users WHERE unique_name = $1', [unique_name]);
    if (userData.length === 0) {
        console.log("User not found for unique_name:", unique_name);
        throw new Error('User not found');
    }
    let currentPoints = Number(userData[0].point);
    let newPoints = currentPoints + Number(scale);
    if (newPoints < 0) newPoints = 0; // Bottom line at 0
    console.log(`Updating points for ${unique_name}: currentPoints=${currentPoints}, scale=${scale}, newPoints=${newPoints}`);

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const updateText = 'UPDATE users SET point = $1 WHERE unique_name = $2';
            const updateValues = [newPoints, unique_name];
            await client.query(updateText, updateValues);
            await client.query('COMMIT');
            return { success: true, message: 'Points updated successfully', newPoints };
        } catch (err) {
            await client.query('ROLLBACK');
            console.error("Transaction error:", err.stack);
            return { success: false, message: err.message };
        } finally {
            console.log("Releasing client");
            client.release();
        }
    } catch (err) {
        console.error("Connection error:", err.stack);
        return { success: false, message: err.message };
    }
}

async function processUpdatePoints(unique_name, scale, isnewadmin, isnewmember, password, name) {
    try {
        const client = await pool.connect();
        ///////////// FOR NEW MEMBER/ADMIN  /////////////
        // allow inseting new admin and member at the same time
        if (isnewadmin) {
            await insertNew('admins', unique_name, password, name);
        }
        if (isnewmember) {
            await insertNew('users', unique_name, password, name);
        }

        console.log("Processing updatePoints for:", unique_name, scale, isnewadmin, isnewmember, password ? "with password" : "no password", name);
        ///////////// FOR POINTS UPDATE  /////////////
        return await updatePoints(unique_name, scale);
    } catch (err) {
        console.error("Connection error:", err.stack);
        return { success: false, message: err.message };
    }
}

function signToken(payload) {
    const jwt = require('jsonwebtoken');
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' }); // token valid for 2 hours
}


// rank for all users and their points
router.get('/pointSys', async (req, res) => {
    const usersdata = await query('SELECT * FROM users ORDER BY point DESC');
    console.log("Fetched users data:", usersdata);
    res.json(usersdata);
});


// update
router.post('/updatePoints', async (req, res) => {
    const { unique_name, scale, isnewadmin, isnewmember, password, name } = req.body;
    console.log("Received updatePoints request:", req.body);
    try {
        const result = await processUpdatePoints(unique_name, scale, isnewadmin, isnewmember, password, name);
        res.json(result);
    } catch (err) {
        return res.status(401).json({ success: false, message: err.message });
    }


});


// for verifying credentials
router.post('/credentials', async (req, res) => {
    console.log("Credentials endpoint hit");
    const info = req.body;

    console.log("Received credentials request:", req.body);

    if (info.withpassword) {

        const { username, password } = req.body;
        const unique_name = username; // for admins, unique_name is username
        console.log("Received credientials with password request:", req.body);

        const adminData = await query('SELECT * FROM admins WHERE username = $1', [unique_name]);
        console.log("Admin data fetched from DB:", adminData);

        if (adminData.length === 0) {
            console.log("Admin not found for username:", unique_name);
            return res.status(401).json({ success: false, message: 'Admin not found' });
        }

        if (adminData[0].password) { // if password do not exist, it means this is a Higher Admin, allow login without password
            // compare hashed password
            const isMatch = await bcrypt.compare(password, adminData[0].password);
            if (!isMatch) {
                console.log("Incorrect password for username:", unique_name);
                return res.status(401).json({ success: false, message: 'Incorrect password' });
            }
        }
        // generate token
        const token = signToken({
            username: unique_name,
            isAdmin: true, name: adminData[0].name,
            RELEASE_MODE
        });
        res.cookie('token', token, {
            httpOnly: true, // prevent XSS
            secure: true, // using HTTPS in release mode, so set secure to true
            sameSite: 'None', // allow cross-site cookies
            maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });
        console.log("Admin logged in successfully:", unique_name);
        console.log("Generated token:", token);
        res.json({ success: true });
    }
    else {
        console.log("Unique name credientials unimplemented request:", req.body);
        res.status(400).json({ success: false, message: 'Unimplemented request' });
    }
});


// for verifying token validity
router.get('/verifyToken', (req, res) => {
    const token = req.cookies.token;
    console.log(req.cookies);
    console.log("Verifying token:", token);
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const jwt = require('jsonwebtoken');
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        console.log("Token verified successfully:", decoded);
        res.json({ success: true, decoded, loggedIn: true });
    });
});

module.exports = router;