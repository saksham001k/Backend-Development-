# Theory Task 2: HTTP Requests and Flask API

## Objective

To understand the HTTP request-response cycle and inspect API responses using a Flask application, browser DevTools, curl and Postman.

## Routes Tested

```text
GET /
GET /students
GET /students/<id>
```

## Commands

```bash
cd demo2flask
python main.py
curl -i http://127.0.0.1:5000/students
curl -i http://127.0.0.1:5000/students/2
```

The same requests can be sent through Postman and inspected from the browser Network tab.

## Result

HTTP requests, JSON responses and status codes were inspected successfully using different development tools.
