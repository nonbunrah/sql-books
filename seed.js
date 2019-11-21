// require our database when running this file
const db = require('./database.js');

// The following list of books will be used to populate the books table
const books_list = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/to_kill_a_mockingbird.jpg",
    release_date: "July 11, 1960"
  },
  {
    title: "The Great Gatsby",
    author: "F Scott Fitzgerald",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/great_gatsby.jpg",
    release_date: "April 10, 1925"
  },
  {
    title: "Les Miserables",
    author: "Victor Hugo",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/les_miserables.jpg",
    release_date: "Unknown 1862"
  },
  {
    title: "Around the World in 80 Days",
    author: "Jules Verne",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/around_the_world_in_80_days.jpg",
    release_date: "January 30, 1873"
  },
  {
    title: "Lean In",
    author: "Sheryl Sandberg",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/lean_in.jpg",
    release_date: "March 11, 2013"
  },
  {
    title: "The Four Hour Workweek",
    author: "Tim Ferriss",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/four_hour_work_week.jpg",
    release_date: "April 1, 2007"
  },
  {
    title: "Of Mice and Men",
    author: "John Steinbeck",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/of_mice_and_men.jpg",
    release_date: "Unknown 1937"
  },
  {
    title: "Romeo and Juliet",
    author: "William Shakespeare",
    image: "https://s3-us-west-2.amazonaws.com/sandboxapi/romeo_and_juliet.jpg",
    release_date: "Unknown 1597"
  }
];

const deleteBooks = 'DELETE FROM books';
const insertIntoBooks = 'INSERT INTO books VALUES (?, ?, ?, ?)';

db.run(deleteBooks, error => {
  if (error) console.log(new Error('Could not delete rows from books'), error);
  else {

    books_list.forEach(book => {
      db.run(insertIntoBooks, [book.title, book.author, book.image, book.release_date], error => {
        if (error) console.log(new Error('Could not add books to books'), error);
        else {
          console.log(`${book.title} successfully added to the database!`);
        }
      });
    });
  }
});
