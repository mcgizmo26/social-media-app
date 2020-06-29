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
};

module.exports = User;