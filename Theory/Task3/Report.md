# Theory Task 3: RESTful API with FastAPI

## Objective

To create and test RESTful CRUD APIs using FastAPI and Pydantic models.

## Implementations

- `main.py`: Student Management API
- `course_api.py`: Course Management API required in the Unit 1 exercise

The Course API supports GET all, GET by ID, POST, PUT and DELETE operations. It also supports filtering with `/courses?department=CSE`.

## Run

```bash
pip install -r requirements.txt
uvicorn course_api:app --reload --port 5000
```

Swagger UI: `http://127.0.0.1:5000/docs`  
ReDoc: `http://127.0.0.1:5000/redoc`

## Result

The RESTful endpoints, input validation, filtering, status codes and automatic API documentation were implemented successfully.
