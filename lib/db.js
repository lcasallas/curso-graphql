'use-strict';

const { MongoClient } = require('mongodb');

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const mongoUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
let connection;

async function connectDB() {
  if (connection) return connection;

  let client;
  try {
    client = new MongoClient(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const connect = await client.connect();
    connection = await connect.db('platzi-courses');
  } catch (error) {
    console.error('Could not connect to db', mongoUrl, error);
    process.exit(1);
  }

  return connection;
}

module.exports = connectDB;
