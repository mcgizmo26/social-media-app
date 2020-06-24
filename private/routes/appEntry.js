// *********************************** App Variables *******************************
const routes = require('express').Router();

const User = require('../models/User');
const { checkIfEmailExist, checkIfUserExist, verifyPassword } = require('../helpers/appEntry_helper');


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
routes.post('/login', async (req, res) => {
    const signin = req.body;
    const exists = await checkIfUserExist(signin, res);

    if(exists.length === 0){
        res.status(404).send('User not found');
    } else {
        console.log(exists[0]);
        const matches = await verifyPassword(signin.password, exists[0].password);
        if(matches){
            res.status(200);
        } else {
            res.status(404).send('Password does not match');
        }
    }
});


// Logout ****************************************************************************
routes.post('/logout', (res, req) => {

});

module.exports = routes;