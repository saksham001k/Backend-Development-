const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const students = [
  {
    id: 1,
    name: 'Saksham Katiyar',
    branch: 'CSE'
  },
  {
    id: 2,
    name: 'Aman Sharma',
    branch: 'CSE'
  },
  {
    id: 3,
    name: 'Riya Singh',
    branch: 'CSE'
  }
];
// EJS configuration
app.set('view engine', 'ejs');
app.set('views', './views');

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Express Server!');
});

// Text response
app.get('/text', (req, res) => {
  res.send('This is plain text response');
});

// HTML response
app.get('/html', (req, res) => {
  res.send('<h1>HTML Response</h1><p>This is HTML content</p>');
});

// JSON response
app.get('/json', (req, res) => {
  res.json({
    message: 'This is JSON response',
    status: 'success',
    data: {
      name: 'Student',
      course: 'Backend Development'
    }
  });
});

// Route parameter
app.get('/user/:id', (req, res) => {
  const userId = req.params.id;

  res.json({
    message: 'User details',
    userId: userId
  });
});

// Product route parameter
app.get('/product/:category/:id', (req, res) => {
  const { category, id } = req.params;

  res.json({
    category: category,
    productId: id
  });
});

// Lab Task 4 - Course Timetable

app.get('/timetable', (req, res) => {
  const timetable = [
    {
      day: 'Monday',
      time: '10:00 AM',
      subject: 'Backend Development',
      faculty: 'Faculty'
    },
    {
      day: 'Tuesday',
      time: '11:00 AM',
      subject: 'Design and Analysis of Algorithms',
      faculty: 'Faculty'
    },
    {
      day: 'Wednesday',
      time: '12:00 PM',
      subject: 'Backend Development Lab',
      faculty: 'Faculty'
    },
    {
      day: 'Thursday',
      time: '10:00 AM',
      subject: 'Computer Networks',
      faculty: 'Faculty'
    }
  ];

  res.render('timetable', {
    timetable
  });
});

// Lab Task 5 - Student Registration Form

app.get('/registration', (req, res) => {
  res.render('register');
});

app.post('/registration', (req, res) => {
  const {
    name,
    email,
    course,
    semester
  } = req.body;

  res.render('result', {
    student: {
      name,
      email,
      course,
      semester
    }
  });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, page, limit } = req.query;

  res.json({
    searchQuery: q,
    page: page || 1,
    limit: limit || 10
  });
});

// Calculator
app.get('/calculate', (req, res) => {
  const { num1, num2, operation } = req.query;

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  let result;

  switch (operation) {
    case 'add':
      result = n1 + n2;
      break;

    case 'subtract':
      result = n1 - n2;
      break;

    case 'multiply':
      result = n1 * n2;
      break;

    case 'divide':
      result = n2 !== 0 ? n1 / n2 : 'Error: Division by zero';
      break;

    case 'modulus':
      result = n2 !== 0 ? n1 % n2 : 'Error: Division by zero';
      break;

    case 'power':
      result = Math.pow(n1, n2);
      break;

    default:
      result = 'Invalid operation';
  }

  res.json({
    num1: n1,
    num2: n2,
    operation,
    result
  });
});

// Register
app.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  res.json({
    message: 'Registration successful',
    user: {
      username,
      email
    }
  });
});

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (
    email === 'test@example.com' &&
    password === 'password123'
  ) {
    res.json({
      success: true,
      message: 'Login successful',
      token: 'sample-jwt-token'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// EJS home
app.get('/home', (req, res) => {
  res.render('home', {
    title: 'Home Page',
    heading: 'Welcome to EJS Templating',
    message: 'EJS makes it easy to generate dynamic HTML'
  });
});

// Users EJS
app.get('/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob@example.com'
    }
  ];

  res.render('users', { users });
});

// Profile EJS
app.get('/profile/:id', (req, res) => {
  const user = {
    id: req.params.id,
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    city: 'New York'
  };

  res.render('profile', { user });
});
// Lab Task 1 - Basic Server

app.get('/student/text', (req, res) => {
  res.send(
    'Name: Saksham Katiyar | Roll Number: 590015169 | Branch: B.Tech CSE'
  );
});

app.get('/student/html', (req, res) => {
  res.send(`
    <h1>Student Details</h1>
    <p><strong>Name:</strong> Saksham Katiyar</p>
    <p><strong>Roll Number:</strong> 590015169</p>
    <p><strong>Branch:</strong> B.Tech CSE</p>
  `);
});

app.get('/student/json', (req, res) => {
  res.json({
    name: 'Saksham Katiyar',
    rollNumber: '590015169',
    branch: 'B.Tech CSE'
  });
});

// Lab Task 3 - Student Management

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const studentId = parseInt(req.params.id);

  const student = students.find(
    student => student.id === studentId
  );

  if (!student) {
    return res.status(404).json({
      message: 'Student not found'
    });
  }

  res.json(student);
});

app.post('/students/add', (req, res) => {
  const { name, branch } = req.body;

  const newStudent = {
    id: students.length + 1,
    name,
    branch
  };

  students.push(newStudent);

  res.status(201).json({
    message: 'Student added successfully',
    student: newStudent
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log('Available endpoints:');
  console.log('GET  /');
  console.log('GET  /text');
  console.log('GET  /html');
  console.log('GET  /json');
  console.log('GET  /user/:id');
  console.log('GET  /product/:category/:id');
  console.log('GET  /search?q=term');
  console.log(
    'GET  /calculate?num1=10&num2=5&operation=add'
  );
  console.log('POST /register');
  console.log('POST /login');
  console.log('GET  /home');
  console.log('GET  /users');
  console.log('GET  /profile/:id');
});