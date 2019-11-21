let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');

const createBooksTableQuery = "CREATE TABLE IF NOT EXISTS books (title TEXT, author TEXT, image TEXT, release_date TEXT)";

database.run(createBooksTableQuery, error => {
  if (error) console.error(new Error("Create books table failed."), error);
  else console.log("Create books table succeeded");
});

module.exports = database;
