const { Client } = require('pg');

const config = require('../config');

const client = new Client({
    connectionString: config.connectionString
});

client.connect();

const dbQuery = (query, params, expressRes) => {
    try {
        const results = client.query(query, params);

        return results;
    } catch(err) {
        expressRes.end();
    }
};

module.exports = dbQuery;