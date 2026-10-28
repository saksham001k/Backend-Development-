# Lecture 25: Introduction to Express.js

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Set up an Express project and create the Student Management API skeleton.

## Work Done

1. Created `package.json` and installed Express.
2. Created `app.js` and enabled the JSON body parser with `app.use(express.json())`.
3. Added a root GET route that returns `API is running`, as requested in the PBL activity.
4. Started the server on port 3000.

## Run

```bash
npm ci
npm start
```

In another terminal:

```bash
curl -i http://localhost:3000/
```

Expected: HTTP 200 with `API is running`.

## What I Learned

Express runs on Node.js and provides routing and middleware. Middleware processes requests before a route handler. `app.get()` handles GET requests, `res.send()` returns a response, and `app.listen()` starts the server.

## Result

The project contains the required `package.json` and `app.js`. The root route was checked over HTTP and returned the expected response.

[Lecture source](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory/Unit%203/&f=L25%20Introduction%20to%20Express.js.md)
