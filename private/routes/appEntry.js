const routes = require('express').Router();
const bcrypt = require('bcrypt');
const { Client } = require('pg');
const config = require('../config');
const client = new Client({
    connectionString: config.connectionString
});
const { checkIfEmailExist } = require('../helpers/appEntry_helper');

client.connect();


// Post ****************************************************************************
routes.post('/signup', async (req, res) => {
    const user = req.body;

    const exists = await checkIfEmailExist(client, user.email);

    if (exists.length === 0) {
        try {
            client.query(
                `INSERT INTO .users (firstname, lastname, email, password)
                VALUES ($1, $2, $3, $4 )`,
                [user.firstname, user.lastname, user.email, bcrypt.hashSync(user.password, 2)]
            );
            res.end();
        } catch (err) {
            console.log(err);
            res.end();
        }
    } else {
        res.status(409).send('Email already exists');
    }

});

routes.post('/login', (res, req) => {

});

routes.post('/logout', (res, req) => {

});

module.exports = routes;