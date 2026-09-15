# Experiment 13A: Express and Mongoose User Management

## Objective

To understand MongoDB, Mongoose and Express by creating a simple user registration and login system.

## Software and Tools Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Visual Studio Code
- Web Browser

## Procedure

1. Created a Node.js project using NPM.
2. Installed Express, Mongoose and dotenv.
3. Connected the Express application to MongoDB Atlas.
4. Created a Mongoose schema and User model.
5. Created a registration form.
6. Stored registered users in MongoDB.
7. Created a login form to verify user credentials.
8. Displayed all registered users using the `find()` method.
9. Tested the application in the browser.

## Routes Implemented

- `GET /` – Display registration and login forms
- `POST /signup` – Register a new user
- `POST /login` – Check user credentials
- `GET /users` – Display registered users

## Mongoose Methods Used

- `save()`
- `findOne()`
- `find()`

## Project Structure

```text
Exp13A/
├── .env.example
├── .gitignore
├── package.json
├── Report.md
└── server.js
```

The actual `.env` file and `node_modules` directory are excluded from Git.

## Result

A simple user registration and login system was created successfully using Express, Mongoose and MongoDB Atlas.

## Conclusion

This experiment provided practical understanding of connecting a Node.js application with MongoDB, defining schemas, creating models and performing basic database operations.

> This is a classroom demonstration. Passwords are stored as plain text only to match the basic experiment requirements.
