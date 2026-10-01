CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    isbn VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE book_authors (
    book_id INTEGER NOT NULL REFERENCES books(id),
    author_id INTEGER NOT NULL REFERENCES authors(id),
    PRIMARY KEY (book_id, author_id)
);

CREATE TABLE members (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE loans (
    id INTEGER PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES members(id),
    book_id INTEGER NOT NULL REFERENCES books(id),
    loan_date DATE NOT NULL,
    return_date DATE,
    CHECK (return_date IS NULL OR return_date >= loan_date)
);

INSERT INTO books VALUES (1, 'Backend Basics', '9780000000001');
INSERT INTO authors VALUES (1, 'A. Sharma'), (2, 'R. Singh');
INSERT INTO book_authors VALUES (1, 1), (1, 2);
INSERT INTO members VALUES (1, 'Saksham', 'saksham@example.com');
INSERT INTO loans VALUES (1, 1, 1, '2026-10-01', NULL);

SELECT m.name AS member, b.title AS book, l.loan_date
FROM loans AS l
JOIN members AS m ON m.id = l.member_id
JOIN books AS b ON b.id = l.book_id;
