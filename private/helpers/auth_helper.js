// *********************************** App Variables *******************************
const jwt_decode = require('jwt-decode')
const jwt = require('jsonwebtoken');

// *********************************** Local Variables *****************************
const db = require('./db_helper');


// *********************************** Helper Functions ****************************
module.exports = {
    cookieExtractor: function (req) {
        var token = null;
        if (req && req.cookies) token = req.cookies['jwt'];

        return token;
    },

    createRefreshToken: async function (user) {
        const query = `
                        SELECT *
                        FROM application_schema.users
                        WHERE user_id = $1`;
        const args = [user._id];
        const queryResults = await db(query, args);

        // return queryResults.rows[0].security_token;
        if (queryResults.rows[0].security_token) {
            const decoded = jwt_decode(queryResults.rows[0].security_token);
            if (decoded.user._id === user._id) {
                const userInfo = queryResults.rows[0];
                delete userInfo.password;
                delete userInfo.security_token;

                const token = await jwt.sign({ user: decoded.user }, process.env.ACCESS_TOKEN_SECRET);

                return { token, userInfo };
            } else {
                return false;
            }
        } else {
            return false;
        }
    },

    getTokenFromDB: async function (user) {
        const query = `
                        SELECT security_token
                        FROM application_schema.users
                        WHERE user_id = $1`;
        const args = [user.user_id];
        const queryResults = await db(query, args);

        console.log(queryResults);
    }
};