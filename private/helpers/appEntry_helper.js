// *********************************** App Variables *******************************
const db = require('./db_helper');
const bcrypt = require('bcrypt');


// *********************************** Helper Functions ****************************
const checkIfEmailExist = async (email, expressRes) => {
    const query = `
        Select email
        FROM application_schema.users
        WHERE email = $1`;
    const args = [email];
    const queryResults = await db(query, args, expressRes);

    return queryResults.rows;
};

const createUser = async (user, expressRes) => {
    const exists = await checkIfEmailExist(user.email);

    if (!exists.length) {
        const query = `
            INSERT INTO application_schema.users
            (firstname, lastname, email, password)
            VALUES ($1, $2, $3, $4 )`;
        const args = [user.firstname, user.lastname, user.email, bcrypt.hashSync(user.password, 2)];
        const queryResults = await db(query, args, expressRes);

        return queryResults.rows;
    } else {
        return false;
    }

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

const verifyPassword = async (password, encryptedPassword) => {
    const matches = await bcrypt.compare(password, encryptedPassword);
    return matches;
};


module.exports = { checkIfEmailExist, checkIfUserExist, verifyPassword, createUser };