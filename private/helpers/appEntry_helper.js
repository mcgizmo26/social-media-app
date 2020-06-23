const db = require('./db_helper');
const bcrypt = require('bcrypt');

const checkIfEmailExist = async (email, expressRes) => {
    const query = `
        Select email
        FROM application_schema.users
        WHERE email = $1`;
    const args = [email];
    const queryResults = await db(query, args, expressRes);

    return queryResults.rows;
};


const checkIfUserExist = async (user, expressRes) => {
    const query = `
            Select *
            FROM application_schema.users
            WHERE email = $1`;
    const args = [user.email];
    const queryResults = await db(query, args, expressRes);

    return queryResults.rows;
};

const verifyPassword = async (password, encryptedPassword, expressRes) => {
    const matches = await bcrypt.compare(password, encryptedPassword);
    return matches;
};



module.exports = { checkIfEmailExist, checkIfUserExist, verifyPassword };