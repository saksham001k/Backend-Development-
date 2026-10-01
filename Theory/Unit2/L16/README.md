# Lecture 16 — CRUD Operations

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Build a Course CRUD API using FastAPI and SQLAlchemy, and connect Student records to a Department and Courses.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000/docs` to send requests, or use Postman at the same URLs. SQLite creates `courses.db` in this folder. `GET /departments` shows the two sample departments (CSE and ECE) and their IDs for student requests.

| Method | Route | Purpose |
|---|---|---|
| GET | `/courses?department=CSE&credits=4&page=1` | Filter courses; 10 results per page |
| GET | `/courses/{id}` | Read one course |
| POST | `/courses` | Create course |
| PUT | `/courses/{id}` | Update course |
| DELETE | `/courses/{id}` | Delete course |
| GET | `/students`, `/students/{id}` | Read students with department and course IDs |
| POST | `/students` | Create student assigned to a department and courses |
| PUT | `/students/{id}` | Update student and related courses |
| DELETE | `/students/{id}` | Delete student and their enrollment links |

Example course JSON:

```json
{"title":"Backend Development","credits":4,"department":"CSE"}
```

After creating a course, use its ID and a department ID from `/departments`:

```json
{"name":"Aarav","email":"aarav@example.com","branch":"CSE","enrollment_date":"2024-09-01","department_id":1,"course_ids":[1]}
```

`queries.sql` contains the three requested queries: students after August 2024, count by branch, and students enrolled in more than three courses. The last query needs four course enrollments to return a student.

## Result

The Course and Student routes were checked locally with requests equivalent to Postman. Pagination, filtering, CRUD, relationships and the three SQL queries are included. Actual testing in your own Postman installation is still a local step.
