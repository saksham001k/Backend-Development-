# Exam01B — Eisenhower Todo

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

A simple Express, EJS and MongoDB application following the same structure as Exam01.

[Faculty question](https://upessocs.github.io/Lectures/Backend%20Development/Lab/Exam%2001%20B.md)

## Requirements implemented

- Add a task with a title, description, urgent checkbox and important checkbox.
- Reject empty or whitespace-only titles. Description is optional.
- Save both flags as booleans and generate `createdAt` on the server when adding a task.
- Fetch tasks from MongoDB and render the four groups with EJS.
- Delete a selected task using its MongoDB ObjectId.
- Use CSS Grid for the matrix layout (the chosen bonus requirement).

| Group | Urgent | Important |
|---|---|---|
| Do | Yes | Yes |
| Schedule | No | Yes |
| Delegate | Yes | No |
| Eliminate | No | No |

## Run

From this folder:

```bash
npm ci
cp .env.example .env
npm start
```

The example uses the examiner's MongoDB URL `mongodb://127.0.0.1:27017`, database `todo_lab` and collection `tasks`. MongoDB must be running. If using Atlas for home practice, set `MONGODB_URI` in `.env` to your working Atlas connection string and allow your current IP in Atlas Network Access. Keep `DB_NAME=todo_lab`. Do not upload `.env`.

Open http://localhost:3000. Stop another app using port 3000 first, or change `PORT` in `.env`.

## Routes and files

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Render the task matrix |
| GET | `/tasks/new` | Render the add-task form |
| POST | `/tasks` | Validate and insert a task, then redirect |
| POST | `/tasks/:id/delete` | Delete the task, then redirect |

`app.js` contains the connection and routes. `views/index.ejs` renders the matrix, `views/new.ejs` renders the form, and `public/style.css` styles both pages. One MongoClient is reused; the HTTP server starts after the database connection succeeds.

## Verification and submission screenshot

Route checks passed using the real Express/EJS app with an isolated in-memory MongoDB collection double: all four flag combinations, title validation, optional description, deletion, invalid/missing IDs, escaped text, and form/CSS routes. The review harness is not part of the submitted app. Live Atlas connectivity and persistence for Exam01B still need to be confirmed locally.

The faculty also requires an application screenshot. Browser execution was blocked in the review environment, so no screenshot is included yet. After running the app locally, add sample tasks, capture the matrix, and save it in this folder as `screenshot.png` before submission.
