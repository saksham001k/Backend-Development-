# Lecture 27: Django Middleware and URL Routing

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Add request logging, app-level routing and a student-detail parameter to the project started in L26.

## Source Files

- [Middleware](../L26/students/middleware.py)
- [App routes](../L26/students/urls.py)
- [Views](../L26/students/views.py)
- [Settings](../L26/student_system/settings.py)
- [Project routes](../L26/student_system/urls.py)

## Work Done

The middleware stores `get_response`, starts a timer, logs the method/path, calls the next handler, then logs the response status and elapsed milliseconds. It returns that response unchanged. It is registered using the correct dotted path while keeping Django's default middleware.

Request processing goes down the middleware list; response processing comes back in reverse order. Session middleware must run before authentication middleware because authentication uses session data. `get_response` is provided by Django and points to the next handler, not necessarily directly to the view.

The project includes `students.urls` under `/api/students/`. The integer converter passes `student_id` to the matching view.

## Run and Check

Start the server from [L26](../L26/README.md), then run:

```bash
curl http://127.0.0.1:8000/api/health/
curl http://127.0.0.1:8000/api/students/
curl http://127.0.0.1:8000/api/students/42/
```

Expected: `{"status":"ok"}`, an empty student list, and a detail response containing `student_id: 42`. The list/detail routes are lecture placeholders, not database queries.

## Routing Error Exercise

I used `/api/student/42/` (singular) while the configured prefix is `/api/students/`. Prediction: 404 because the prefix does not match. The check returned 404. Correcting the URL to `/api/students/42/` returned 200 and student ID 42. A non-integer such as `/api/students/abc/` also returns 404 because it fails the converter.

## Result

The route and middleware checks verify the list, parameterized detail, health endpoint, request logs, status/time logs and the deliberately incorrect URL. The corrected route is the one committed.

[Lecture source](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory/Unit%203/&f=L27%20Django%20Middleware%20and%20Routing.md)
