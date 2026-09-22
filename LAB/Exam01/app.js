require("dotenv").config();

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

let notesCollection;

// Retrieve notes and render the home page.
app.get("/", async (req, res) => {
  try {
    const notes = await notesCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.render("index", { notes });
  } catch (error) {
    console.error("Could not retrieve notes:", error.message);
    res.status(500).send("Unable to load notes. Please try again.");
  }
});
// Display the add-note form.
app.get("/notes/new", (req, res) => {
  res.render("new", {
    error: "",
    values: { title: "", content: "", category: "" }
  });
});

// Validate and save a submitted note.
app.post("/notes", async (req, res) => {
  const body = req.body || {};

  const title = typeof body.title === "string"
    ? body.title.trim() : "";

  const content = typeof body.content === "string"
    ? body.content.trim() : "";

  const category = typeof body.category === "string"
    ? body.category.trim() : "";

  const values = { title, content, category };

  if (!title || !content) {
    return res.status(400).render("new", {
      error: "Title and content cannot be empty.",
      values
    });
  }

  try {
    await notesCollection.insertOne({
      title,
      content,
      category: category || "General",
      createdAt: new Date()
    });

    res.redirect(303, "/");
  } catch (error) {
    console.error("Could not save note:", error.message);

    res.status(500).render("new", {
      error: "Unable to save the note. Please try again.",
      values
    });
  }
});

// Delete one note using its MongoDB ID.
app.post("/notes/:id/delete", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid note ID.");
  }

  try {
    const result = await notesCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).send("Note not found.");
    }

    res.redirect(303, "/");
  } catch (error) {
    console.error("Could not delete note:", error.message);
    res.status(500).send("Unable to delete the note. Please try again.");
  }
});

async function startServer() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing from .env");
    process.exitCode = 1;
    return;
  }

  const client = new MongoClient(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000
  });

  try {
    await client.connect();

    const database = client.db(process.env.DB_NAME || "notes_lab");
    await database.command({ ping: 1 });

    notesCollection = database.collection("notes");

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`My Notes: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    await client.close();
    process.exitCode = 1;
  }
}

startServer();