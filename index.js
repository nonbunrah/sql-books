// Require statements
let express = require('express');
let database = require('./database.js');
let app = express();


// Middleware
app.use(express.json());


// Configuration Variables
const port = 3000;


// Routes
app.get('/', (request, response) => {
  response.send('Visit /api/books to see our list of titles');
});

// get all books
app.get('/api/books',  (req, res) => {
  // send all books as JSON response
  const getAllBooks = 'SELECT * FROM books';

  database.all(getAllBooks, (error, results) => {
    if (error) {
      console.log("Get all books table failed", error);
      res.sendStatus(500);
    }
    else {
      res.status(200).json(results);
    }
  });
});

// get one book
app.get('/api/books/:id',  (req, res) => {
  // find one book by its id

});

// create new book
app.post('/api/books',  (req, res) => {
  // create new book with form data (`req.body`)

});

// update book
app.put('/api/books/:id', (req,res) => {
  // get book id from url params (`req.params`)
  const bookId = req.params.id;
  const updateOneBook = `UPDATE books SET TITLE = ? WHERE books.oid = ${bookId}`;

  // use the query string and req.body to run the query on the database
  database.run(updateOneBook, [req.body.title], error => {
    if (error) {
      console.log(`Update book with ID ${bookId} failed.`, error);
      res.sendStatus(500);
    }
    else {
      console.log(`Book with ID ${bookId} was updated successfully`);
      res.sendStatus(200);
    }
  });
});

// delete book
app.delete('/api/books/:id',  (req, res) => {
  // get book id from url params (`req.params`)

});


// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

