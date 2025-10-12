const express = require('express');
const app = express();

const path = require('path');
const PORT = process.env.PORT || 3000;

const { FRONTEND_URL, BACKEND_URL } = require('./config/config.js');

//secure cookies and CORS settings
const cors = require('cors');
app.use(cors({
  origin: FRONTEND_URL,
  methods: ["GET", "POST"],
  credentials: true
}));
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// structure
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// for login related issues, please check ./auth/
const auth = require('./auth/auth.js');
app.use('/auth', auth);

// for database related issues, please check ./database/
const database = require('./database/database.js');
app.use('/database', database);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});