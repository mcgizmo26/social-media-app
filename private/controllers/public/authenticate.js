// *********************************** App Variables *******************************
const express = require('express');
const passport = require('passport');
// const jwt = require('jsonwebtoken');
require('dotenv').config();


const User = require('../../helpers/user/user_helpers');

// *********************************** Use Middleware ******************************
const router = express.Router();


// *********************************** Routes **************************************
/*When the user sends a post request to this route, passport authenticates the user based on the
middleware created previously */
router.post('/authenticate', (req, res, next) => {

});


module.exports = router;