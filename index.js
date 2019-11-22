// Require statements
let express = require('express');
let app = express();
let database = require('./database.js');

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
  const getAllBooks = "SELECT * FROM books";

  database.all(getAllBooks, (error, results) => {
    if (error) {
      console.log(new Error('Could not get all books'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  });
});

// get one book
app.get('/api/books/:id',  (req, res) => {
  // find one book by its id

});

// create new book
app.post('/api/books',  (req, res) => {
  // create new book with data (`req.body`)

});

// update book
app.put('/api/books/:id', (req,res) => {
  // get book id from url params (`req.params`)
  const bookId = parseInt(req.params.id);

  // Use the keys in req.body to create dynamic SET values for the query string
  const queryHelper = Object.keys(req.body).map(ele => `${ ele.toUpperCase() } = ?`);

  // Use the dynamic SET values in from queryHelper to build full UPDATE string
  const updateOneBook = `UPDATE books SET ${queryHelper.join(', ')} WHERE books.oid = ?`;

  // Add values from req.body and the bookId to an array for use in database.run()
  const queryValues = [...Object.values(req.body), bookId];


  database.run(updateOneBook, queryValues, function (error) {
    if (error) {
      console.log(new Error('Could not update book'), error);
      res.sendStatus(500);
    } else {
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

