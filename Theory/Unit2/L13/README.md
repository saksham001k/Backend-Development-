# Lecture 13 — Introduction to Databases

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Use a relational table and a MongoDB collection for student records, then compare the queries.

## PostgreSQL

Install PostgreSQL, create a practice database, and run the SQL file:

```bash
createdb student_management
psql -d student_management -f students.sql
```

The script creates the required columns, inserts six students, filters CSE students and dates after January 2024, updates one branch, and deletes the sixth sample student. Five records remain. Run it once on a new practice database.

## MongoDB

Install MongoDB locally or connect `mongosh` to your Atlas cluster, then run:

```bash
mongosh --file students.mongodb.js
```

For Atlas, connect with `mongosh` first, then run `.load('students.mongodb.js')`. The script inserts three documents and queries the CSE branch. Do not put your Atlas password in this repository. Run the sample insert once in a practice database.

## Comparison

| PostgreSQL | MongoDB |
|---|---|
| The table has fixed column types and a unique email constraint. | Each document can have different fields. |
| `INSERT` adds a row; `SELECT ... WHERE` filters rows. | `insertMany` adds documents; `find({...})` filters documents. |
| Good when student records need defined relationships and joins. | Useful when document fields vary across records. |

Both keep data after the application closes. These commands are prepared for local database execution; connection to your PostgreSQL/MongoDB installation is not verified here.

The lecture asks for a MySQL–MongoDB comparison but also recommends trying PostgreSQL. I used PostgreSQL for the relational side; the basic `INSERT` and `SELECT` experience is similar in MySQL.
