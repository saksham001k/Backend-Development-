# Backend Development

SAP ID: 590015169  
Course: Backend Development

This repository contains theory work and laboratory experiments completed as part of the Backend Development course.

---

## 📚 Theory

Theory and classroom work related to Backend Development will be maintained inside the `Theory` directory.

---

## 🧪 Laboratory Experiments

| Experiment | Title | Status |
|---|---|---|
| [Experiment 1](./LAB/Exp1/Report.md) | Create a Web Page with All Possible Elements of HTML5 | ✅ Completed |
| [Experiment 12](./LAB/Exp12/Report.md) | Node.js, Express.js, and EJS Templating | ✅ Completed |

---

## 📁 Repository Structure

```text
Backend-Development-/
│
├── README.md
├── Theory/
│
└── LAB/
    │
    ├── Exp1/
    │   ├── index.html
    │   └── Report.md
    │
    └── Exp12/
        ├── .gitignore
        ├── app.js
        ├── script.js
        ├── package.json
        ├── package-lock.json
        ├── nodemon.json
        ├── Report.md
        └── views/
            ├── home.ejs
            ├── users.ejs
            ├── profile.ejs
            ├── timetable.ejs
            ├── register.ejs
            └── result.ejs
````

---

## ✅ Experiment 1

### Title

Create a Web Page with All Possible Elements of HTML5

### Objective

To understand and implement various HTML5 elements including semantic elements, text formatting, lists, tables, forms, multimedia, and interactive elements.

### Files

* [`index.html`](./LAB/Exp1/index.html) — HTML implementation
* [`Report.md`](./LAB/Exp1/Report.md) — Experiment report

### Status

Completed

---

## ✅ Experiment 12

### Title

Node.js, Express.js, and EJS Templating

### Objective

To understand and implement server-side JavaScript using Node.js, create web servers and APIs using Express.js, handle HTTP requests and responses, work with URL and query parameters, process POST data, implement EJS templating, and use Nodemon for automatic server restart during development.

### Concepts Implemented

* Node.js and NPM
* Express.js server
* HTTP request and response handling
* Text, HTML, and JSON responses
* Route parameters
* Query parameters
* POST request handling
* Calculator API
* Student management routes
* EJS templating
* Dynamic data rendering
* Course timetable using EJS
* Student registration form
* Nodemon auto-restart

### Main Routes

```text
GET  /
GET  /text
GET  /html
GET  /json

GET  /user/:id
GET  /product/:category/:id

GET  /search
GET  /calculate

POST /register
POST /login

GET  /home
GET  /users
GET  /profile/:id

GET  /student/text
GET  /student/html
GET  /student/json

GET  /students
GET  /students/:id
POST /students/add

GET  /timetable

GET  /registration
POST /registration
```

### Files

* [`app.js`](./LAB/Exp12/app.js) — Main Express.js application
* [`script.js`](./LAB/Exp12/script.js) — Basic Node.js program
* [`package.json`](./LAB/Exp12/package.json) — Project configuration and dependencies
* [`nodemon.json`](./LAB/Exp12/nodemon.json) — Nodemon configuration
* [`views/`](./LAB/Exp12/views/) — EJS templates
* [`Report.md`](./LAB/Exp12/Report.md) — Complete experiment report

### EJS Templates

* `home.ejs`
* `users.ejs`
* `profile.ejs`
* `timetable.ejs`
* `register.ejs`
* `result.ejs`

### Status

Completed

---

## 📌 Progress

This repository will be updated regularly with new theory topics, laboratory experiments, improvements, and corrections throughout the Backend Development course.
