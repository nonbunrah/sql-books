// Require statements
let express = require('express');
let database = require('./database.js');
let app = express();

// Middleware
app.use(express.json());


// Configuration Variables
const port = 3000;


// Routes
app.get('/', (req, res) => {
  res.send('Visit /api/books to see our list of titles');
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
  const bookId = req.params.id
  const getBook = `SELECT * FROM books WHERE books.oid = ?`;

  database.all(getBook, [bookId], (error, results) => {
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
  const bookId = req.params.id
  const getBook = `DELETE FROM books WHERE books.oid = ?`;

  database.all(getBook, [bookId], (error, results) => {
    if (error) {
      console.log(new Error('Could not delete book'), error);
      res.sendStatus(500);
    }
    console.log("Book was successfully deleted")
    res.status(200).json({message: "Deleted successfully!"});
  })
});


////////////////////////
// TODO: AUTHOR ROUTES
////////////////////////

// 1. Write a route to retrieve all authors from the database
app.get('/api/authors',  (req, res) => {
  // send all books as JSON response
  const getAllAuthors = "SELECT * FROM authors";

  database.all(getAllAuthors, (error, results) => {
    if (error) {
      console.log(new Error('Could not get all author'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  });
});

// 2. Write a route to add a new author to the database
app.post('/api/authors',  (req, res) => {
  // create new book with form data (`req.body`)
  const reqBody = [req.body.name]
  const createNewAuthorString = "INSERT INTO authors VALUES (?)"

  database.run(createNewAuthorString, reqBody, err => {
    if(err) {
      console.log(`Error inserting new book ${req.body.name}`, err)
      res.sendStatus(500)
    } else {
      console.log(`Added new book ${req.body.name}`)
      res.sendStatus(200)
    }
  })
}); 

// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.

// delete author
app.delete('/api/authors/:id',  (req, res) => {
  // get book id from url params (`req.params`)
  const authorId = req.params.id
  const getAuthor = `DELETE FROM authors WHERE authors.oid = ?`;

  database.all(getAuthor, [authorId], (error, results) => {
    if (error) {
      console.log(new Error('Could not delete author'), error);
      res.sendStatus(500);
    }
    console.log("Author was successfully deleted")
    res.status(200).json({message: "Deleted successfully!"});
  })
});

//////////////////////////
// TODO: CATEGORY ROUTES
//////////////////////////

// 1. Add a route to retrieve all categories from the database
app.get('/api/categories',  (req, res) => {
  // send all books as JSON response
  const getAllCategories = "SELECT * FROM categories";

  database.all(getAllCategories, (error, results) => {
    if (error) {
      console.log(new Error('Could not get all categories'), error);
      res.sendStatus(500);
    }
    res.status(200).json(results);
  });
});
// 2. Write a route to add a new category to the database
app.post('/api/categories',  (req, res) => {
  // create new book with form data (`req.body`)
  const reqBody = [req.body.name]
  const createNewCategoryString = "INSERT INTO categories VALUES (?)"

  database.run(createNewCategoryString, reqBody, err => {
    if(err) {
      console.log(`Error inserting new book ${req.body.name}`, err)
      res.sendStatus(500)
    } else {
      console.log(`Added new book ${req.body.name}`)
      res.sendStatus(200)
    }
  })
}); 
// 3. (OPTIONAL) Write the rest of the RESTful routes for this entity for extra practice.

/////////////////////////////////////////////////
// TODO: BOOKS_CATEGORIES ROUTES (MANY TO MANY)
/////////////////////////////////////////////////

// Retrive a book's categories using book ID
app.get('/api/books/:id/categories', (req, res) => {
  const bookid = req.params.id;
  const queryString = "SELECT * FROM books_categories WHERE book_id = ?";

  database.all(queryString, [bookId], (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
    } else { 
        res.status(200).json(results)
    }
  })
});

// Create an association between a book and a category using the book ID
app.post('/api/books/:id/categories', (req, res) => {
  const bookId = req.params.id;
  const categoryId = req.body.category_id;
  const insertString = "INSERT INTO books_categories VALUES (?, ?)";

  database.run(insertString, [bookId, categoryId], error => {
    if (error) {
        console.log(error);
        res.sendStatus(500);
    } else {
        res.sendStatus(200)
    }
  })
});


// Start Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});