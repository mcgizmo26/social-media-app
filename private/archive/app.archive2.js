// *********************************** App Variables *******************************
const express = require('express');

const config = require('./config');
const posts = require('../routes/posts');
const appEntry = require('./appEntry.archive');


// *********************************** Use Middleware ******************************
const app = express();

app.use(express.json());


// *********************************** Routes **************************************

app.use('/posts', posts);
app.use('/authenticate', appEntry);


// *********************************** Handle Errors *******************************
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});



// *********************************** Start Server ********************************
app.listen(config.port, () => {
  console.log('Server started')
});



