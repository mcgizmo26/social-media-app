const bcrypt = require('bcrypt');

const db = require('../helpers/db_helper');

class User {
    async get(userId, expressRes){
        const query = `
            Select *
            WHERE userId = $1
        `;
        const args = [userId];

        return db(query, args, expressRes);
    };

    async create(user, expressRes){
        const query = `
            INSERT INTO application_schema.users
            (firstname, lastname, email, password)
            VALUES ($1, $2, $3, $4 )`;
        const args = [user.firstname, user.lastname, user.email, bcrypt.hashSync(user.password, 2)];
        await db(query, args, expressRes);

        expressRes.sendStatus(200);
    };
};

module.exports = User;