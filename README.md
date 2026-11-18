# Backend Development

**Name:** Saksham Katiyar

**SAP ID:** 590015169

**Course:** Backend Development

This repository contains the theory exercises and laboratory experiments completed during the Backend Development course.

## Lab examinations

[Open Exam01B — Eisenhower Todo](./LAB/Exam01B/README.md)

Exam01B uses Express, EJS and MongoDB to add tasks, group them by urgency and importance, and delete them. CSS Grid is the chosen bonus. Source and setup instructions are included. Live database verification and the required screenshot are pending local execution.

### Exam01 — My Notes

[Open Exam01](./LAB/Exam01/README.md) · [Application screenshot](./LAB/Exam01/screenshot.png)

Exam01 is a notes application using Express, EJS and MongoDB. All compulsory features are implemented, with CSS as the optional interface enhancement. Source, templates, configuration example, execution instructions and a screenshot are included.

Local practice confirmed MongoDB connectivity and persistence. The uploaded code also passed 12 isolated route checks; see the Exam01 README for the verification scope and screenshot provenance. PostgreSQL and authentication are not required for Exam01.

## Assignments

| Assignment | Work | Status |
|---|---|---|
| [Assignment 1](./Assignment/Assignment1/) | Notes App using HTML, CSS, JavaScript and localStorage | ✅ Completed |
| [Assignment 2](./Assignment/Assignment2.md) | PostgreSQL JSONB and equivalent MongoDB queries | ✅ Written; local database timings to record |

## Theory — Unit 1

| Task | Topic | Status |
|---|---|---|
| [Task 1](./Theory/Task1/) | Node.js and Express Environment | ✅ Completed |
| [Task 2](./Theory/Task2/) | HTTP Requests and Flask API | ✅ Completed |
| [Task 3](./Theory/Task3/) | RESTful APIs with FastAPI | ✅ Completed |
| [Task 4](./Theory/Task4/) | Sessions, Cookies and Query Strings | ✅ Completed |
| [Task 5](./Theory/Task5/) | LocalStorage, SessionStorage and JSON | ✅ Completed |
| [Task 6](./Theory/Task6/) | Server-Side Rendering with EJS and Jinja2 | ✅ Completed |

## Theory — Unit 2

| Lecture | Topic | Status |
|---|---|---|
| [Lecture 13](./Theory/Unit2/L13/README.md) | PostgreSQL and MongoDB student records | Scripts ready; local database run pending |
| [Lecture 14A](./Theory/Unit2/L14A/README.md) | Library schema and order normalization | ✅ SQL checked locally |
| [Lecture 14B](./Theory/Unit2/L14B/README.md) | 1NF through BCNF explanation | ✅ Completed |
| [Lecture 15](./Theory/Unit2/L15/README.md) | Data modeling with SQLAlchemy and Mongoose | ✅ Exercise completed |
| [Lecture 16](./Theory/Unit2/L16/README.md) | FastAPI and SQLAlchemy CRUD | ✅ Routes checked locally |

## Theory — Unit 3

[Open Unit 3](./Theory/Unit3/README.md) · [Theory index](./Theory/README.md)

| Lecture | Topic | Status |
|---|---|---|
| [Lecture 25](./Theory/Unit3/L25/README.md) | Express setup and API skeleton | ✅ Root response checked |
| [Lecture 26](./Theory/Unit3/L26/README.md) | Django setup and JSON response | ✅ Configuration and routes checked |
| [Lecture 27](./Theory/Unit3/L27/README.md) | Django logging middleware and app routes | ✅ Logging, routing and error exercise checked |
| [Lecture 28](./Theory/Unit3/L28/README.md) | Third-party API integration | ✅ Timeout/error handling and mocked tests passed |

L26 contains the shared Django project extended by L27 and L28. Unit 3 is completed through L28 only. Unit 2 L17–L24 is still pending.

## Theory — Unit 4

[Open Unit 4 reference](./Theory/Unit4/README.md) · [FastAPI Docker hands-on repository](https://github.com/saksham001k/fastapi-docker-handson) · [Successful workflow](https://github.com/saksham001k/fastapi-docker-handson/actions/runs/44060310292)

The Student API, Dockerfile, two FastAPI instances, Nginx configuration and GitHub Actions workflow are maintained in the separate repository required by the tutorial. The Docker project is referenced here; the L44–L45 and Docker comparison exercises are stored directly under Theory/Unit4.

Five API tests, Docker build, 20 load-balanced requests, multi-platform Docker Hub publishing, and pulling/running the published image passed in Actions. Local Docker Compose startup and API requests were also confirmed on my Mac. These exercises cover parts of Unit 4. The separate visible source-change demonstration remains to be recorded.

### L44–L45 — Backend API test automation

[Open exercise](./Theory/Unit4/L44-L45/README.md) · [GitHub Actions workflow](./.github/workflows/backend-api-tests.yml)

FastAPI addition, subtraction and multiplication routes, three Requests checks and 12 parameterized/validation/root pytest checks. GitHub Actions starts the server and runs real HTTP tests on relevant pushes and pull requests. All three Requests checks and all 12 pytest cases passed locally and in [GitHub Actions](https://github.com/saksham001k/Backend-Development-/actions/runs/44290479629). The earlier Docker reference remains in place.

### Docker Compose vs Docker Run

[Open the Unit 4 exercise](./Theory/Unit4/Docker-Compose-vs-Run/README.md). Compare Docker Run and Docker Compose with the same Nginx page, then run WordPress and MySQL as a two-service example.

## Laboratory Experiments

[Open lab index](./LAB/README.md) · [Experiment 15 report](./LAB/Exp15/Report.md)

| Experiment | Title | Status |
|---|---|---|
| [Exam01B](./LAB/Exam01B/README.md) | Eisenhower Todo with Express, EJS and MongoDB | ✅ Implemented and documented |
| [Exam01](./LAB/Exam01/README.md) | My Notes with Express, EJS and MongoDB | ✅ Implemented and documented |
| [Experiment 0](./LAB/Exp0/Report.md) | Git Basics | ✅ Completed |
| [Experiment 1](./LAB/Exp1/Report.md) | HTML5 Elements | ✅ Completed |
| [Experiment 2](./LAB/Exp2/Report.md) | Types of Cascading Style Sheets | ✅ Completed |
| [Experiment 3](./LAB/Exp3/Report.md) | Responsive Web Page with HTML and CSS | ✅ Completed |
| [Experiment 4](./LAB/Exp4/Report.md) | Responsive Pages with Bootstrap and Tailwind | ✅ Completed |
| [Experiment 5](./LAB/Exp5/Report.md) | JavaScript Arrays, Objects and Functions | ✅ Completed |
| [Experiment 7 & 8](./LAB/Exp7_8/README.md) | ES6, DOM Manipulation and Event Handling | ✅ Completed |
| [Experiment 12A](./LAB/Exp12/Report.md) | Node.js, Express.js, EJS and Nodemon | ✅ Completed |
| [Experiment 12B](./LAB/Exp12B/README.md) | Sessions and Cookies | ✅ Completed |
| [Experiment 13A](./LAB/Exp13A/Report.md) | Express and Mongoose User Management | ✅ Completed |
| [Experiment 15](./LAB/Exp15/README.md) | Django To-Do: CRUD, Admin, templates, static files and L28 external API (one project) | ✅ Implemented and checked |

## Main Technologies Used

- HTML5, CSS3, Bootstrap and Tailwind CSS
- JavaScript, Node.js, Express.js and EJS
- Python, Flask, FastAPI, Jinja2 and Django
- SQLite and Django ORM
- Git, GitHub Actions, Docker, Docker Hub and Nginx
- REST APIs, sessions, cookies and browser storage
- MongoDB with the native Node.js driver and Mongoose

## Separate Mini Applications

| Application | Description | Status |
|---|---|---|
| [To-Do List](./Todo/) | Add, complete and delete tasks using localStorage | ✅ Completed |

## Repository Structure

```text
Backend-Development-/
├── Assignment/
│   ├── Assignment1/  (Notes App)
│   └── Assignment2.md
├── Todo/
├── LAB/
│   ├── Exam01/
│   ├── Exam01B/
│   ├── Exp0/
│   ├── Exp1/
│   ├── Exp2/
│   ├── Exp3/
│   ├── Exp4/
│   ├── Exp5/
│   ├── Exp7_8/
│   ├── Exp12/
│   ├── Exp12B/
│   ├── Exp13A/
│   └── Exp15/  (one app for both lab manuals)
├── Theory/
│   ├── Unit2/L13/
│   ├── Unit2/L14A/
│   ├── Unit2/L14B/
│   ├── Unit2/L15/
│   ├── Unit2/L16/
│   ├── Unit4/
│   │   ├── README.md  (index and separate Docker-project reference)
│   │   ├── Docker-Compose-vs-Run/
│   │   └── L44-L45/  (FastAPI, Requests and pytest)
│   ├── Unit3/
│   │   ├── L25/
│   │   ├── L26/  (shared Django project for L26–L28)
│   │   ├── L27/
│   │   └── L28/
│   ├── Task1/
│   ├── Task2/
│   ├── Task3/
│   ├── Task4/
│   ├── Task5/
│   └── Task6/
└── README.md
```

## Progress

Laboratory submissions through Experiment 13A and the combined Experiment 15, all six Unit 1 theory tasks, Unit 2 Lectures 13 through 16, Unit 3 Lectures 25 through 28, and the two assignments are maintained in this repository. Assignment 2 includes commands for a local PostgreSQL and MongoDB run; its EXPLAIN ANALYZE timings are pending that run.

Unit 2 L17–L24 and Unit 3 L29 onward remain pending. There are 15 theory exercises across Units 1–3 and three Unit 4 entries: the separate Docker hands-on reference, L44–L45 API testing and Docker Compose vs Docker Run. This is not continuous completion of every lecture or all of Unit 4.

## Work log

- 22 September 2026: Added Exam01 notes application, validated its required flows, added execution scripts, screenshot and submission documentation. Updated the coursework portal with Exam01 links.

- 23 September 2026: Added Exam01B Eisenhower Todo, required templates, CSS Grid, execution instructions. Checked the task flows with an isolated collection double.

- 29 September 2026: Completed Experiment 5 JavaScript demonstrations and library PBL, verified Node.js output, and updated the coursework portal.

- 1 October 2026: Moved the browser Notes App into Assignment 1, added Assignment 2 PostgreSQL JSONB and MongoDB work, and checked Unit 1 task reports and source files.

- 1 October 2026: Completed Lecture 15 data modeling exercise with a conceptual E-Commerce model, SQLAlchemy Student Management CRUD, and Mongoose Blog schema validation.

- 1 October 2026: Added Unit 2 Lecture 13 database scripts, Lecture 14 schema and normalization work, and Lecture 16 CRUD API. Checked SQL with SQLite and exercised the API locally. Live PostgreSQL/MongoDB runs remain local steps.


- 27 October 2026: Added Experiment 15 as one Django/SQLite app covering v1 Basic and v2, with Admin, shared templates, static assets, tests and documentation. Updated the coursework and personal portals. Also completed the missing combined Experiment 7/8 ES6 and DOM exercise. The lab index lists optional labs separately.


- 28 October 2026: Added Unit 3 L25–L28: Express API skeleton, Django project, request logging and student routes, and a third-party service utility with timeout handling and mocked tests. Express HTTP check and all 14 Django tests passed. Updated the theory index and both coursework portals.


- 28 October 2026: Extended the existing LAB/Exp15 app with Theory L28: requests utility, external-post JSON route, timeout/error handling, shared-header link and mocked tests. All 20 Exp15 tests passed. Updated the lab report, READMEs and both portals.

- 17 November 2026: Linked the separate FastAPI Docker hands-on repository under Theory/Unit4, added the verified CI and local Docker status, and updated both coursework portals.

- 18 November 2026: Added the L44–L45 arithmetic API, Requests tests, pytest cases and automated HTTP-testing workflow under the existing Unit 4 theory work. Updated the course index and page.
