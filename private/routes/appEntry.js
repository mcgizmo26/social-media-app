// *********************************** App Variables *******************************
const routes = require('express').Router();

const User = require('../models/User');
const { checkIfEmailExist, checkIfUserExist } = require('../helpers/appEntry_helper');


// Signup ****************************************************************************
routes.post('/signup', async (req, res) => {
    const user = new User();
    const signup = req.body;
    const exists = await checkIfEmailExist(signup.email);

    if (exists.length === 0) {
        user.create(signup, res);
    } else {
        res.status(409).send('Email already exists');
    }
});


// Login *****************************************************************************
routes.post('/login', async (res, req) => {
    await checkIfUserExist();
});


// Logout ****************************************************************************
routes.post('/logout', (res, req) => {

});

module.exports = routes;