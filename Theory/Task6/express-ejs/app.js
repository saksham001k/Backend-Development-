const express = require("express");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
];

app.get("/", (req, res) => res.render("students", { title: "Student List", students }));
app.get("/about", (req, res) => res.render("about", { course: "Backend Development", lecturer: "Dr. Prateek Raj Gautam" }));

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
