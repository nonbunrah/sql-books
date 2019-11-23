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
  const getBook = `SELECT * FROM books WHERE author_id = ?`;

  database.all(getBook, (error, results) => {
    if (error) {
      console.log(new Error('Could not get book'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  })
});

// create new book
app.post('/api/books',  (req, res) => {
  // create new book with form data (`req.body`)
  const reqBody = [req.body.title, req.body.author_id, req.body.image, req.body.release_date, req.body.page_count]
  const createNewBookString = "INSERT INTO books VALUES (?, ?, ?, ?, ?)"
  database.run(createNewBookString, reqBody, err => {
    if(err) {
      console.log(`Error inserting new book ${req.body.title}`)
      res.sendStatus(500)
    } else {
      console.log(`Added new book ${req.body.title}`)
      res.sendStatus(200)
    }
  })
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