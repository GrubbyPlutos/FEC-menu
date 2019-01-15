const { Client } = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sdc';

const client = new Client(connectionString);
client.connect()

