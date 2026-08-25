# Experiment 12B: Sessions and Cookies using Node.js

## Objective

To understand and implement session and cookie management using Node.js and Express.js.

## Concepts Covered

- HTTP stateless nature
- Cookies
- Sessions
- Session IDs
- Cookie creation, retrieval and deletion
- Session creation and destruction
- Login state management
- Protected routes
- Session-based user-specific data
- Cookie-based preferences

## Packages Used

- Express
- express-session
- cookie-parser

## Implementations

### Session Example

`Source/session-example.js`

Demonstrates session creation, visit counting and session destruction.

### Cookie Example

`Source/cookie-example.js`

Demonstrates setting, reading and deleting cookies.

### Combined Demo

`Source/server.js`

Demonstrates login using sessions and cookie creation.

## Lab Assignment

### Exercise 1: Simple User Login System

Implemented:

- Registration
- Login
- Session-based authentication
- Protected dashboard
- Logout

### Exercise 2: Session-Based To-Do Manager

Implemented:

- Add tasks
- View tasks
- Delete tasks
- Per-session task storage
- Cookie-based theme preference

## Result

Sessions and cookies were successfully implemented using Node.js and Express.js.

## Conclusion

Sessions provide server-side state management while cookies store small pieces of data in the browser. Sessions are suitable for login state and sensitive user-specific information, while cookies are useful for preferences and identifiers.