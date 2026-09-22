# Exam01 viva preparation

## Explain the application in 30 seconds

My Notes is an Express application that stores notes in MongoDB and renders them with EJS. Each note has a title, content, category and creation date. A form submits a POST request, the server validates it and inserts a document. The home route retrieves notes and renders HTML. Each Delete button submits the note ID, which the server converts to ObjectId before deleting that document.

## Explain app.js in order

1. dotenv loads private configuration into process.env.
2. Express creates the application; EJS is configured as the template engine.
3. express.urlencoded parses form data into req.body. express.static serves CSS.
4. Routes define list, form, add and delete behaviour.
5. startServer connects one MongoClient, selects notes_lab and the notes collection, then starts listening after the connection check succeeds.

## Questions and short answers

1. **Why Express?** It provides routing, middleware and HTTP response helpers on Node.js.
2. **Why EJS?** It generates HTML on the server from a template and data. The browser receives HTML.
3. **What is middleware here?** express.urlencoded parses form bodies; express.static serves files. Middleware order matters.
4. **What is req.body?** The parsed submitted fields, such as title and content.
5. **What is req.params.id?** The value matched by :id in the route URL.
6. **Why trim input?** It removes surrounding spaces so a spaces-only title or content is rejected.
7. **Why validate on the server when the form has required?** Browser validation can be bypassed and does not reject every whitespace-only value.
8. **What is a collection and document?** notes is the collection; each saved note is a document with fields and an _id.
9. **Why ObjectId?** The URL carries a string, while the stored _id normally has BSON ObjectId type. Convert it for the query.
10. **What does find().toArray() do?** find returns a cursor; toArray asynchronously collects its results into an array.
11. **Why sort createdAt by -1?** It displays the newest notes first.
12. **What does insertOne do?** It inserts one note document. new Date supplies its creation time on the server.
13. **What does deleteOne do?** It deletes one matching document. deletedCount tells us whether a document was removed.
14. **Why POST for deletion?** Normal HTML forms support GET and POST. GET should retrieve data without requesting deletion. Our form and route both use POST.
15. **Why redirect with 303?** The browser follows with a GET for the list page, avoiding resubmitting the POST when that page is refreshed.
16. **What do EJS tags mean?** <% runs logic without output; <%= displays escaped output. Escaping prevents note text from being treated as HTML in these positions.
17. **What does await do?** It waits within the async function for a promise to settle, so the response follows the database operation.
18. **Why connect before listen?** It prevents the app accepting requests before the initial database connection is usable.
19. **Which status codes appear?** 200 for normal pages, 303 for redirects, 400 for invalid fields/ID, 404 for a missing note and 500 for database failures.
20. **Why does the note survive restarting Node?** MongoDB holds the persistent data independently of the application process.
21. **Do we use Mongoose?** No. This app uses the MongoDB Node.js driver directly; it has no Mongoose schema/model.
22. **Is it full CRUD?** It implements create, read and delete. Update/edit is not implemented and is optional in this exam.
23. **Why did Atlas initially fail?** My current public IP was absent from its access list. The connection succeeded after I added it.
24. **What goes into Git?** Source, templates, CSS, package files, README, example configuration and screenshot. Private .env and installed node_modules stay out.
25. **What is the database setup during the exam?** Use the supplied MongoDB service, normally mongodb://127.0.0.1:27017, with database notes_lab and collection notes, unless instructed otherwise.

## Demonstration order

Start the app, open the notes list, add one note, show all four fields, reject a spaces-only title, delete only the chosen test note and explain persistence. Existing notes belong to a shared classroom application; it has no user accounts or ownership checks, which the exam does not require.

## Three common mistakes

- The delete form must include /delete: /notes/ID/delete, matching the route.
- .env.example is a sample. dotenv loads .env; the credentials must remain private.
- A rendered page alone does not prove persistence. Retrieving the note after restarting demonstrates the stored record.
