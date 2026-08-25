const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}));

app.get('/', (req, res) => {
    if (req.session.username) {
        res.send(`
            <h1>Welcome back, ${req.session.username}!</h1>
            <p>You are currently logged in.</p>
            <a href="/logout">Logout</a>
        `);
    } else {
        res.send(`
            <h1>Session & Cookie Demo</h1>

            <form action="/login" method="POST">
                <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    required
                >

                <button type="submit">
                    Login
                </button>
            </form>
        `);
    }
});

app.post('/login', (req, res) => {
    const { username } = req.body;

    req.session.username = username;

    res.cookie('theme', 'dark', {
        maxAge: 900000,
        httpOnly: true
    });

    res.redirect('/');
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});