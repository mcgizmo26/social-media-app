// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
require('dotenv').config();
const cookies = require("cookie-parser");

const routes = require('./routes/routes');
const secureRoutes = require('./routes/secure.routes');


// *********************************** Use Middleware ******************************
const app = express();
require('./auth/auth');
app.use(express.json());
app.use(cookies());

app.use(passport.initialize());


// *********************************** Routes **************************************
app.use('/authenticate', routes);
app.use('/app', passport.authenticate('jwt', { session: false }), secureRoutes);

// app.use('/app', secureRoutes);

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({ error: err });
});

// *********************************** Start Server ********************************
app.listen(process.env.PORT, () => {
    console.log('Server started');
});