const { Pool } = require('pg')
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../connection.env') });

module.exports = new Pool({
    connectionString: process.env.URL,
})