const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: 'todo-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.todos) {
        req.session.todos = [];
    }

    next();
});

app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'light';

    let todoItems = '';

    req.session.todos.forEach((todo, index) => {
        todoItems += `
            <li>
                ${todo}
                <a href="/delete/${index}">
                    Delete
                </a>
            </li>
        `;
    });

    res.send(`
        <!DOCTYPE html>

        <html>

        <head>
            <title>Session To-Do List</title>
        </head>

        <body>

            <h1>Session-Based To-Do List</h1>

            <p>
                Current theme:
                <strong>${theme}</strong>
            </p>

            <form action="/add" method="POST">

                <input
                    type="text"
                    name="todoItem"
                    placeholder="Enter a task"
                    required
                >

                <button type="submit">
                    Add
                </button>

            </form>

            <h2>Your Tasks</h2>

            <ul>
                ${todoItems || '<li>No tasks yet</li>'}
            </ul>

            <p>
                <a href="/theme/dark">
                    Dark Theme
                </a>
                |
                <a href="/theme/light">
                    Light Theme
                </a>
            </p>

        </body>

        </html>
    `);
});

app.post('/add', (req, res) => {
    const { todoItem } = req.body;

    if (todoItem) {
        req.session.todos.push(todoItem);
    }

    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);

    req.session.todos =
        req.session.todos.filter(
            (item, index) => index !== id
        );

    res.redirect('/');
});

app.get('/theme/:theme', (req, res) => {
    const theme = req.params.theme;

    res.cookie('theme', theme, {
        maxAge: 900000,
        httpOnly: true
    });

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(
        `To-Do Manager running at http://localhost:${PORT}`
    );
});