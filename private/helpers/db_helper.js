// *********************************** App Variables *******************************
const { Client } = require('pg');
require('dotenv').config();


// *********************************** Local Variables *****************************
const client = new Client({
    connectionString: process.env.CONNECTION_STRING
});
client.connect();


// *********************************** Exported Functions **************************
const dbQuery = (query, params, expressRes) => {
    try {
        const results = client.query(query, params);
        return results;
    } catch(err) {
        expressRes.end();
    }
};

module.exports = dbQuery;