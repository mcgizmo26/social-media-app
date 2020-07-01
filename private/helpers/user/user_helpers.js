// *********************************** App Variables *******************************
const db = require('../db_helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// *********************************** Helper Functions ****************************
module.exports = {
    checkIfEmailExist: async (email, expressRes) => {
        const query = `
            Select email
            FROM application_schema.users
            WHERE email = $1`;
        const args = [email];
        const queryResults = await db(query, args, expressRes);
        return queryResults.rows[0];
    },

    createUser: async (user, expressRes) => {
        const exists = await this.checkIfEmailExist(user.email);

        if (!exists.length) {
            const query = `
                INSERT INTO application_schema.users
                (firstname, lastname, email, password)
                VALUES ($1, $2, $3, $4 )`;
            const args = [user.firstname, user.lastname, user.email, bcrypt.hashSync(user.password, 2)];
            const queryResults = await db(query, args, expressRes);

            return queryResults.rows[0];
        } else {
            return false;
        }

    },

    checkIfUserExist: async (user, expressRes) => {
        const query = `
                Select *
                FROM application_schema.users
                WHERE email = $1`;
        const args = [user.email];
        const queryResults = await db(query, args, expressRes);

        return queryResults.rows[0];
    },

    verifyPassword: async (password, encryptedPassword) => {
        const matches = await bcrypt.compare(password, encryptedPassword);
        return matches;
    },

    createRefreshToken: async (user) => {
        // We don't want to store the sensitive information such as the user password in the token so we pick only the email and id
        const body = { _id: user.user_id, email: user.email };
        //Sign the JWT token and populate the payload with the user email and id
        const token = await jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);
        if (token) {
            const query = `
                    UPDATE application_schema.users
                    SET security_token = $1
                    WHERE user_id = $2 `;
            const args = [token, user.user_id];
            const queryResults = await db(query, args);

            return queryResults.rows[0];
        } else {
            return false;
        }
    },

    createJWT: async (user) => {
        const query = `
                SELECT security_token
                FROM application_schema.users
                WHERE user_id = $1`;
        const args = [user.user_id];
        const queryResults = await db(query, args);

        if(queryResults.rows[0].security_token){
            const body = { _id: user.user_id, email: user.email };
            const token = await jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);

            return token;
        };
    }
};
