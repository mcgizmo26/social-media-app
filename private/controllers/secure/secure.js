// *********************************** App Variables *******************************
const express = require('express');


// *********************************** Custom Variables ****************************
const posts = require('./posts');


// *********************************** Use Middleware ******************************
const router = express.Router();


// *********************************** Routes **************************************
router.use('/posts', posts);


module.exports = router ;