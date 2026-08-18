# Experiment 12: Node.js, Express.js, and EJS Templating

## Objective

To understand and implement server-side JavaScript using Node.js, build RESTful APIs with Express.js, handle HTTP requests and responses, work with URL parameters and POST data, implement EJS templating, and use Nodemon for automatic server restart during development.

## Software and Tools Used

- Node.js
- NPM
- Express.js
- EJS
- Nodemon
- Visual Studio Code
- Web Browser
- Terminal / Command Line


## Theory

### Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows JavaScript to run outside the browser and is commonly used for server-side development.

Key features of Node.js include:

- Asynchronous and event-driven architecture
- Non-blocking I/O
- Single-threaded event loop
- Fast execution using the V8 engine
- Large NPM ecosystem
- Cross-platform support

### NPM

NPM stands for Node Package Manager. It is used to install and manage packages and project dependencies.

Important commands used in this experiment:

bash
npm init -y
npm install express
npm install ejs


### Express.js

Express.js is a lightweight web application framework for Node.js. It simplifies the process of creating servers, routes, APIs, and handling HTTP requests and responses.

Some Express response methods used are:

* `res.send()`
* `res.json()`
* `res.render()`
* `res.status()`

### EJS

EJS stands for Embedded JavaScript. It is a templating engine that allows JavaScript values and logic to be embedded inside HTML.

Example:

ejs
<h1><%= heading %></h1>


### Nodemon

Nodemon is a development utility that automatically restarts the Node.js server whenever changes are detected in project files.

-

## Procedure

### 1. Initialize the Node.js Project

The project was initialized using:

bash
npm init -y


This generated the `package.json` file.

### 2. Install Dependencies

Express and EJS were installed using:

 bash
npm install express ejs
-

Nodemon was installed as a development dependency using:

-bash
npm install nodemon -D
-

### 3. Create Basic Node.js Script

A `script.js` file was created to demonstrate execution of JavaScript using Node.js.

It displays a welcome message and calculates the sum of an array of numbers.

### 4. Create Express Server

An Express application was created using `app.js`.

The server runs on port `3000`.

-javascript
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
-

### 5. Implement HTTP Response Routes

Different routes were created to demonstrate text, HTML, and JSON responses.

Examples:

-text
GET /text
GET /html
GET /json
-

### 6. Implement URL Parameters

Route parameters were implemented using `req.params`.

Examples:

-text
GET /user/:id
GET /product/:category/:id
-

### 7. Implement Query Parameters

Query parameters were accessed using `req.query`.

Examples:

-text
GET /search?q=nodejs&page=2&limit=20
GET /calculate?num1=10&num2=5&operation=add
-

### 8. Handle POST Data

The following middleware was used:

-javascript
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
-

POST routes were created for registration and login.

-text
POST /register
POST /login
-

### 9. Configure EJS

EJS was configured using:

-javascript
app.set('view engine', 'ejs');
app.set('views', './views');
-

The following EJS templates were created:

* `home.ejs`
* `users.ejs`
* `profile.ejs`

### 10. Configure Nodemon

The development script was configured in `package.json`:

-json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
-

The application can be started using:

-bash
npm run dev
-

-

## Lab Tasks Implemented

### Task 1: Basic Server

Routes were created to return student details in different formats:

-text
GET /student/text
GET /student/html
GET /student/json
-

The routes display:

* Name
* Roll Number
* Branch

-

### Task 2: Calculator API

A calculator API was implemented using query parameters.

Supported operations:

* Addition
* Subtraction
* Multiplication
* Division
* Modulus
* Power

Example:

-text
/calculate?num1=10&num2=5&operation=add
-

-

### Task 3: Student Management

The following routes were implemented:

-text
GET /students
GET /students/:id
POST /students/add
-

These routes allow users to retrieve the student list, retrieve a specific student, and add a new student.

-

### Task 4: Course Timetable using EJS

An EJS template called `timetable.ejs` was created.

The timetable displays:

* Day
* Time
* Subject
* Faculty

The timetable data is passed from the Express route to the EJS template.

Route:

-text
GET /timetable
-

-

### Task 5: Student Registration Form

An EJS registration form was created with the following fields:

* Name
* Email
* Course
* Semester

The submitted form data is processed using a POST request and displayed on a result page.

Routes:

-text
GET /registration
POST /registration
-

-

## Project Structure

-text
Exp12/
├── .gitignore
├── app.js
├── nodemon.json
├── package.json
├── package-lock.json
├── script.js
├── Report.md
└── views/
    ├── home.ejs
    ├── profile.ejs
    ├── register.ejs
    ├── result.ejs
    ├── timetable.ejs
    └── users.ejs
-

The `node_modules` directory is excluded from Git using `.gitignore`.

-

## Result

Successfully created and executed a Node.js and Express.js application capable of handling different HTTP responses, URL parameters, query parameters, POST requests, REST-style routes, EJS templates, student management operations, calculator operations, timetable rendering, and student registration.

Nodemon was successfully configured to automatically restart the server whenever source files were modified.

-

## Conclusion

In this experiment, Node.js and NPM were used to create and manage a backend project. Express.js was used for routing and HTTP request-response handling. URL parameters, query parameters, and POST data were implemented. EJS was used for dynamic server-side HTML rendering, and Nodemon was used to improve the development workflow through automatic server restart.

This experiment provided practical understanding of the fundamental concepts required for backend web development using Node.js and Express.js.


