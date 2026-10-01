CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    enrollment_date DATE NOT NULL
);

INSERT INTO students (id, name, branch, email, enrollment_date) VALUES
(1, 'Aarav', 'CSE', 'aarav@example.com', '2024-08-01'),
(2, 'Diya', 'ECE', 'diya@example.com', '2023-08-01'),
(3, 'Rohan', 'CSE', 'rohan@example.com', '2025-01-15'),
(4, 'Priya', 'IT', 'priya@example.com', '2024-07-10'),
(5, 'Kabir', 'CSE', 'kabir@example.com', '2023-09-20'),
(6, 'Neha', 'ME', 'neha@example.com', '2024-09-02');

SELECT * FROM students WHERE branch = 'CSE';
SELECT * FROM students WHERE enrollment_date > DATE '2024-01-31';
UPDATE students SET branch = 'ECE' WHERE id = 1;
DELETE FROM students WHERE id = 6;
SELECT * FROM students ORDER BY id;
