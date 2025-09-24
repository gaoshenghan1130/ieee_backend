const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;
const mysql = require('mysql2');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const login = require('./auth/auth.js');
app.use('/auth', login);


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


app.get('/pointsys', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('pointSys', { users: results });
    });
});

app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});