let sqlite3 = require('sqlite3');
let database = new sqlite3.Database('./database.db');

// Book table attributes
//  - title (text)
//  - author (text)
//  - image (text)
//  - release_date (text)
//  - page_count (integer)

const createTableBooksQuery = "CREATE TABLE IF NOT EXISTS books (title TEXT, author TEXT, image TEXT, release_date TEXT, page_count INTEGER)";

database.run(createTableBooksQuery, error => {
    if (error) {
        console.log("Create books table failed", error);
    }
    else {
        console.log("Create books table succeeded");
    }
});

module.exports = database;