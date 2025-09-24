const express = require('express');
const path = require('path');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../public'))); // mainly for assets
const { getTokenHeader, getTokenBody } = require('./getoken');

// first step: render login page
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/um-login', async (req, res) => {
    res.send('UM Login - Functionality to be implemented');
    // console.log("in um-login");
    // try {
    //     const token = await getTokenHeader();
    //     console.log("Access Token:", token);
    //     res.send(`Token: ${token}`);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Failed to get token');
    // }
});

router.get('/admin-login', (req, res) => {
    res.send('Admin Login - Functionality to be implemented');
});

module.exports = router;