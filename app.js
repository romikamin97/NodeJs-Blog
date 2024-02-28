require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookies = require("cookie-parser");

const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to DB
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookies());




app.use(express.static('public'));

// Tepmlating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});