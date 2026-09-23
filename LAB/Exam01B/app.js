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

let tasksCollection;

// Retrieve tasks and render the home page.
app.get("/", async (req, res) => {
  try {
    const tasks = await tasksCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const quadrants = [
      { title: "Do", description: "Urgent and important", isUrgent: true, isImportant: true },
      { title: "Schedule", description: "Not urgent, but important", isUrgent: false, isImportant: true },
      { title: "Delegate", description: "Urgent, but not important", isUrgent: true, isImportant: false },
      { title: "Eliminate", description: "Not urgent and not important", isUrgent: false, isImportant: false }
    ];

    for (const quadrant of quadrants) {
      quadrant.tasks = tasks.filter(task =>
        task.isUrgent === quadrant.isUrgent &&
        task.isImportant === quadrant.isImportant
      );
    }

    res.render("index", { quadrants });
  } catch (error) {
    console.error("Could not retrieve tasks:", error.message);
    res.status(500).send("Unable to load tasks. Please try again.");
  }
});
// Display the add-task form.
app.get("/tasks/new", (req, res) => {
  res.render("new", {
    error: "",
    values: { title: "", description: "", isUrgent: false, isImportant: false }
  });
});

// Validate and save a submitted task.
app.post("/tasks", async (req, res) => {
  const body = req.body || {};

  const title = typeof body.title === "string"
    ? body.title.trim() : "";

  const description = typeof body.description === "string"
    ? body.description.trim() : "";

  const isUrgent = body.isUrgent === "on";
  const isImportant = body.isImportant === "on";
  const values = { title, description, isUrgent, isImportant };

  if (!title) {
    return res.status(400).render("new", {
      error: "Title cannot be empty.",
      values
    });
  }

  try {
    await tasksCollection.insertOne({
      title,
      description,
      isUrgent,
      isImportant,
      createdAt: new Date()
    });

    res.redirect(303, "/");
  } catch (error) {
    console.error("Could not save task:", error.message);

    res.status(500).render("new", {
      error: "Unable to save the task. Please try again.",
      values
    });
  }
});

// Delete one task using its MongoDB ID.
app.post("/tasks/:id/delete", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const result = await tasksCollection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).send("Task not found.");
    }

    res.redirect(303, "/");
  } catch (error) {
    console.error("Could not delete task:", error.message);
    res.status(500).send("Unable to delete the task. Please try again.");
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

    const database = client.db(process.env.DB_NAME || "todo_lab");
    await database.command({ ping: 1 });

    tasksCollection = database.collection("tasks");

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Eisenhower Todo: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Startup failed:", error.message);
    await client.close();
    process.exitCode = 1;
  }
}

startServer();
