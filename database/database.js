const express = require('express');
const path = require('path');
const router = express.Router();
router.use(express.static(path.join(__dirname, '../public'))); // for asset if want to render ejs


// SQL connection setup - currently commented as no database is used
// console.log("try to connect mysql");
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'pointSys'
// });

// connection.connect((err) => {
//     if (err) throw err;
//     console.log('Connected to MySQL database!');
// });

const testUsers = [{
    unique_name: 'u1',
    name: 'Alice',
    point: 100
}, {
    unique_name: 'u2',
    name: 'Bob',
    point: 150
},
{
    unique_name: 'u3',
    name: 'Charlie',
    point: 200
}];

router.get('/pointSys', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.json(testUsers);
    // connection.query('SELECT * FROM users', (err, results) => {
    //     if (err) throw err;
    //     res.render('pointSys', { users: results });
    // });
});

module.exports = router;