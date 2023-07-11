// -- TEST THAT DB CONNECTION HAS BEEN ESTABLISHED
const db = require('./db');

async function testConnection() {
  try {
    const client = await db.connect();

    const result = await client.query('SELECT NOW()');
    console.log('Connected to the db:', result.rows[0].now);

    client.release();
  } catch (error) {
    console.error('Error connecting to the db:', error);
  }
}

testConnection();