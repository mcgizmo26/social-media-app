// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
require('dotenv').config();
const cookies = require("cookie-parser");

const publicCtrl = require('./controllers/public/public');
const secureCtrl = require('./controllers/secure/secure');


// *********************************** Use Middleware ******************************
const app = express();
require('./auth/auth');
app.use(express.json());
app.use(cookies());


// *********************************** Controllers **************************************
app.use('/public', publicCtrl);
app.use('/app', passport.authenticate('secure', { session: false }), secureCtrl);


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

// *********************************** Start Server ********************************
app.listen(process.env.PORT, () => {
    console.log('Server started');
});