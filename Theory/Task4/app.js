const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

// Cookie middleware
app.use(cookieParser());

// Session middleware
app.use(
  session({
    secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000
    }
  })
);

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Session, Cookie and Query String Demo</h1>

    <ul>
      <li><a href="/login">Start Session</a></li>
      <li><a href="/profile">View Session</a></li>
      <li><a href="/logout">Destroy Session</a></li>

      <li><a href="/setcookie">Set Cookie</a></li>
      <li><a href="/getcookie">Read Cookie</a></li>
      <li><a href="/deletecookie">Delete Cookie</a></li>

      <li>
        <a href="/welcome?user=Saksham&role=student">
          Query String Example
        </a>
      </li>
    </ul>
  `);
});


// -------------------------
// SESSION EXAMPLE
// -------------------------

app.get('/login', (req, res) => {
  req.session.username = 'Saksham';

  res.send(
    'Session started for ' + req.session.username
  );
});

app.get('/profile', (req, res) => {
  if (req.session.username) {
    res.send(
      'Welcome ' + req.session.username
    );
  } else {
    res.send(
      'Please log in first.'
    );
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send(
        'Error destroying session'
      );
    }

    res.send(
      'Session destroyed successfully'
    );
  });
});


// -------------------------
// COOKIE EXAMPLE
// -------------------------

app.get('/setcookie', (req, res) => {
  res.cookie(
    'username',
    'Saksham',
    {
      maxAge: 3600000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict'
    }
  );

  res.send(
    'Cookie has been set!'
  );
});

app.get('/getcookie', (req, res) => {
  const user =
    req.cookies.username;

  if (user) {
    res.send(
      'Welcome back, ' + user
    );
  } else {
    res.send(
      'No cookie found.'
    );
  }
});

app.get('/deletecookie', (req, res) => {
  res.clearCookie('username');

  res.send(
    'Cookie deleted.'
  );
});


// -------------------------
// QUERY STRING EXAMPLE
// -------------------------

app.get('/welcome', (req, res) => {
  const user = req.query.user;
  const role = req.query.role;

  res.send(
    `Welcome ${user}, your role is ${role}`
  );
});


app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});