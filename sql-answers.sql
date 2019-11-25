-- Write a SQL query that:
-- 1) Get the longest book by page_count
select * from books
where page_count = 
	(select max(page_count) from books);
-- 2) Selects the book titles based on a given category id 
select b.title, c.name from books b
join books_categories bc on b.oid = bc.book_id
join categories c on bc.category_id = c.oid
where bc.category_id = 8
-- 3) Sum up the page count of the books associated with the theater category
select sum(b.page_count) from books b
join books_categories bc on b.oid = bc.book_id
join categories c on bc.category_id = c.oid
where c.name = "Theatre"
-- 4) Sum up the number of books associated with both the fiction and tragedy categories
select sum(page_count) from books b
join books_categories bc on b.oid = bc.book_id
join categories c on bc.category_id = c.oid
where c.name = "Fiction" OR c.name = "Tragedy"
-- 5) Select one author and return all of categories their books are associated with
select c.name from books b
join books_categories bc on b.oid = bc.book_id
join categories c on bc.category_id = c.oid
join authors a on b.author_id = a.oid
where a.name = "Sheryl Sandberg"
-- 6) Create a hometown column for the authors table and set all of the values to "unknown"
alter table authors add hometown TEXT; 
update authors set hometown="unknown";