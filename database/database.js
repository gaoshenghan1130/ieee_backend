const express = require('express');
const path = require('path');
const router = express.Router();
const pkg = require('pg')
router.use(express.static(path.join(__dirname, '../public'))); // for asset if want to render ejs

const { DB_CONFIG, FRONTEND_URL } = require('../config/config.js');

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

// const testUsers = [{
//     unique_name: 'u1',
//     name: 'Alice',
//     point: 100
// }, {
//     unique_name: 'u2',
//     name: 'Bob',
//     point: 150
// },
// {
//     unique_name: 'u3',
//     name: 'Charlie',
//     point: 200
// }];

// basic display
router.get('/pointSys', async (req, res) => {
    const usersdata = await query('SELECT * FROM users ORDER BY point DESC');
    res.json(usersdata);
});


// update
router.post('/updatePoints', async (req, res) => {
    const body = req.body;
    console.log(body);
    res.redirect(FRONTEND_URL + 'ui/login/redirection.html');
    // const originalPoints = await query('SELECT point FROM users WHERE unique_name = $1', [unique_name]).then(rows => rows[0] ? rows[0].point : null);
    // if (originalPoints === null) {
    //     return res.status(404).json({ error: 'User not found' });
    // }
    // const points = originalPoints + addpoints;
    // await query('UPDATE users SET point = $1 WHERE unique_name = $2', [points, unique_name]);
    // res.json({ name, unique_name, points });
});

module.exports = router;