const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');

// load env. variables
dotenv.config({ path: './config/config.env' });

// run connection to database
const connectToDatabase = require('./config/db');
connectToDatabase();

//set up express app
const app = express();

// enable cors
app.use(cors());

// body parser
app.use(express.json());

// route files
const week = require('./routes/week');
const tests = require('./routes/test');
const board = require('./routes/board');

// mount routes
app.use('/api/week', week);
app.use('/api/test', tests);
app.use('/api/board', board);

// start server
const server = app.listen(
    5000,
    console.log(' Server running on port 5000 '.green.inverse)
);