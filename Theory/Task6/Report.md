# Theory Task 6: Server-Side Rendering and Templating Engines

## Objective

To generate dynamic HTML on the server using Express with EJS and FastAPI with Jinja2.

## Express and EJS

- Student data displayed in a table
- Alternating row colours added through CSS
- `/about` route renders course and lecturer variables
- Static CSS served from the `public` directory

## FastAPI and Jinja2

- Current server date and time rendered using `{{ now }}`
- Static CSS mounted through FastAPI
- A simple server illustration displayed in the template

## Run

```bash
cd express-ejs
npm install
npm start
```

```bash
cd fastapi-jinja
pip install -r requirements.txt
uvicorn main:app --reload
```

## Result

Dynamic server-rendered pages were created successfully using both EJS and Jinja2 templates.
