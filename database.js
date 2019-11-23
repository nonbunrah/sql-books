let sqlite3 = require('sqlite3');

//will sit in root of project directory
let database = new sqlite3.Database('./database.db');

// Book table attributes
// - title (text)
// - author (text)
// - image (text)
// - release_date (text)
// - page_count (integer)

// Create variable for the SQL statement
const createTableBooksQuery = 
`CREATE TABLE IF NOT EXISTS books (
	title TEXT, 
	author_id INTEGER, 
	image TEXT, 
	release_date TEXT, 
	page_count INTEGER)`;

const createTableAuthorsQuery = 
`CREATE TABLE IF NOT EXISTS authors (
	name TEXT)`;

const createTableCategoriesQuery = 
`CREATE TABLE IF NOT EXISTS categories (
	name TEXT)`;

const createTableBooksCategoriesQuery = 
`CREATE TABLE IF NOT EXISTS books_categories (
	book_id INTEGER,
	category_id INTEGER)`;

// Create database.run
database.run(createTableBooksQuery, error => {
	if (error) {console.log("Create books table failed", error)} 
	else {console.log("Create books table succeeded!")}
});

database.run(createTableAuthorsQuery, error => {
	if (error) {console.log("Create authors table failed", error)} 
	else {console.log("Create authors table succeeded!")}
});

database.run(createTableCategoriesQuery, error => {
	if (error) {console.log("Create categories table failed", error)} 
	else {console.log("Create categories table succeeded!")}
});

database.run(createTableBooksCategoriesQuery, error => {
	if (error) {console.log("Create books_categories table failed", error)} 
	else {console.log("Create books_categories table succeeded!")}
});

// Export database
module.exports = database;