const express = require('express');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'login-secret-key',
    resave: false,
    saveUninitialized: false
}));

const users = [];

function authMiddleware(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/register', (req, res) => {
    res.send(`
        <h1>User Registration</h1>

        <form method="POST" action="/register">
            <input
                type="text"
                name="username"
                placeholder="Username"
                required
            >

            <br><br>

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            >

            <br><br>

            <button type="submit">
                Register
            </button>
        </form>

        <p>
            Already registered?
            <a href="/login">Login</a>
        </p>
    `);
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    const existingUser = users.find(
        user => user.username === username
    );

    if (existingUser) {
        return res.send(`
            <p>User already exists.</p>
            <a href="/register">Try Again</a>
        `);
    }

    users.push({
        username,
        password
    });

    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.send(`
        <h1>User Login</h1>

        <form method="POST" action="/login">

            <input
                type="text"
                name="username"
                placeholder="Username"
                required
            >

            <br><br>

            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            >

            <br><br>

            <button type="submit">
                Login
            </button>

        </form>

        <p>
            New user?
            <a href="/register">Register</a>
        </p>
    `);
});

app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = users.find(
        user =>
            user.username === username &&
            user.password === password
    );

    if (!user) {
        return res.send(`
            <p>Invalid username or password.</p>
            <a href="/login">Try Again</a>
        `);
    }

    req.session.user = {
        username: user.username
    };

    res.redirect('/dashboard');
});

app.get(
    '/dashboard',
    authMiddleware,
    (req, res) => {
        res.send(`
            <h1>Dashboard</h1>

            <p>
                Welcome,
                ${req.session.user.username}
            </p>

            <p>
                This page is protected by session authentication.
            </p>

            <a href="/logout">Logout</a>
        `);
    }
);

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

app.listen(PORT, () => {
    console.log(
        `Login System running at http://localhost:${PORT}`
    );
});