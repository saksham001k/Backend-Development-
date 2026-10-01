-- Run against the SQLite file created by main.py, or adapt table names to PostgreSQL.
SELECT id, name, enrollment_date
FROM students
WHERE enrollment_date > '2024-08-31';

SELECT branch, COUNT(*) AS student_count
FROM students
GROUP BY branch;

SELECT s.id, s.name, COUNT(e.course_id) AS course_count
FROM students AS s
JOIN enrollments AS e ON e.student_id = s.id
GROUP BY s.id, s.name
HAVING COUNT(e.course_id) > 3;
