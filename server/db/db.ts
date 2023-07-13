require('dotenv').config();
const { Pool } = require('pg');

const database = new Pool({
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
  host: process.env.POSTGRES_HOST,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
});

module.exports = database;
