const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>User Management System</title>
            <style>
                body { max-width: 700px; margin: 40px auto; padding: 20px; font-family: Arial, sans-serif; background: #f2f2f2; }
                h1 { text-align: center; }
                .container { margin: 20px 0; padding: 20px; background: white; border-radius: 8px; }
                input { width: 100%; margin: 6px 0; padding: 10px; box-sizing: border-box; }
                button { margin-top: 8px; padding: 10px 18px; border: 0; background: #2563eb; color: white; cursor: pointer; }
                a { color: #2563eb; }
            </style>
        </head>
        <body>
            <h1>User Management System</h1>

            <div class="container">
                <h2>Register New User</h2>
                <form action="/signup" method="POST">
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="email" name="email" placeholder="Email" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Sign Up</button>
                </form>
            </div>

            <div class="container">
                <h2>Login</h2>
                <form action="/login" method="POST">
                    <input type="text" name="username" placeholder="Username" required>
                    <input type="password" name="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                </form>
            </div>

            <div class="container">
                <h2>View Users</h2>
                <a href="/users">Show All Registered Users</a>
            </div>
        </body>
        </html>
    `);
});

app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email, password });
        await newUser.save();

        res.send(`
            <h2>User registered successfully!</h2>
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <a href="/">Go back to home</a>
        `);
    } catch (error) {
        const message = error.code === 11000
            ? "Username or email already exists."
            : error.message;

        res.send(`
            <h2>Error: ${message}</h2>
            <a href="/">Go back and try again</a>
        `);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.send('<h2>User not found.</h2><a href="/">Go back</a>');
        }

        if (user.password !== password) {
            return res.send('<h2>Incorrect password.</h2><a href="/">Go back</a>');
        }

        res.send(`
            <h2>Login successful!</h2>
            <p>Welcome, ${user.username}</p>
            <p>Email: ${user.email}</p>
            <a href="/">Go back to home</a>
        `);
    } catch (error) {
        res.send(`<h2>Error: ${error.message}</h2><a href="/">Go back</a>`);
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();

        if (users.length === 0) {
            return res.send('<h2>No users registered yet.</h2><a href="/">Go back</a>');
        }

        let output = "<h2>Registered Users</h2><ul>";

        users.forEach((user) => {
            output += `<li><strong>${user.username}</strong> - ${user.email}</li>`;
        });

        output += '</ul><a href="/">Go back to home</a>';
        res.send(output);
    } catch (error) {
        res.send(`<h2>Error: ${error.message}</h2><a href="/">Go back</a>`);
    }
});

async function startServer() {
    if (!process.env.MONGODB_URI) {
        console.error("MONGODB_URI is missing. Create the .env file first.");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });

        console.log("Connected to MongoDB successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
