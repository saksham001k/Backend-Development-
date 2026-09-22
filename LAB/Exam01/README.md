# Exam 01 — My Notes

Name: Saksham Katiyar
SAP ID: 590015169

## Objective

Create a notes application using Express, EJS and MongoDB.
The application supports adding, viewing and deleting notes.

## Technologies

- Node.js and Express
- EJS templates
- MongoDB Node.js driver
- CSS
- dotenv

## Features

- Display notes with title, content, category and creation date
- Show a message when no notes are available
- Add notes with server-side validation
- Reject empty or whitespace-only titles and content
- Delete a selected note using its MongoDB ID
- Preserve notes after restarting the application
- Simple CSS styling

## Setup and Run

Run these commands from the Exam01 folder:

```bash
npm install
cp .env.example .env
node app.js
```

Copy the example only when setting up a fresh project.
If .env already exists, keep it and check its settings.

The example uses the MongoDB server supplied for the exam:
mongodb://127.0.0.1:27017

For Atlas, set MONGODB_URI in the private .env file to the
Atlas connection string and allow the current IP address.

Database: notes_lab
Collection: notes

Open http://localhost:3000.

## Routes

| Method | Route | Purpose |
| --- | --- | --- |
| GET | / | Display all notes |
| GET | /notes/new | Display the form |
| POST | /notes | Validate and save a note |
| POST | /notes/:id/delete | Delete the selected note |

## Files

- app.js — server, routes and database connection
- check-db.js — separate database connection check
- views/index.ejs — notes list
- views/new.ejs — add-note form
- public/style.css — page styling
- .env.example — sample configuration without credentials
- screenshot.png — application screenshot

## Testing Completed

- Empty-state message displayed
- Note added and displayed
- Whitespace-only title rejected
- Selected note deleted
- Saved notes remained after application restarts
- CSS styling displayed correctly

## Learning Outcome

I learned how Express handles form submissions, EJS renders
database records into HTML, and MongoDB stores notes persistently.
I also learned to validate input and identify documents using ObjectId.

## Configuration Safety

The private .env file and node_modules are excluded from Git.