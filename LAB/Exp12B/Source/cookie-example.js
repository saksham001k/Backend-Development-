const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    res.cookie('username', 'Saksham', {
        maxAge: 900000,
        httpOnly: true
    });

    res.send('Cookie has been set');
});

app.get('/get-cookie', (req, res) => {
    const user = req.cookies.username;

    if (user) {
        res.send(`Cookie Retrieved: ${user}`);
    } else {
        res.send('No cookie found');
    }
});

app.get('/delete-cookie', (req, res) => {
    res.clearCookie('username');

    res.send('Cookie deleted');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});