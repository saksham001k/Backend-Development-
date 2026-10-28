# Lecture 26: Django Framework

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Set up Django, understand the project/app structure and return JSON from a Student Management API.

## Work Done

1. Created the `student_system` project and the `students` app.
2. Registered the app in `INSTALLED_APPS`.
3. Added an index view returning the API message, version and running status.
4. Connected the view through the project's URL configuration.
5. Continued the same project with the L27 middleware/routes and L28 service integration.

## Run

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py test
python manage.py runserver
```

Open http://127.0.0.1:8000/ . Expected JSON:

```json
{"message":"Welcome to the Student Management API","version":"1.0","status":"running"}
```

## MVT and Project Structure

| Part | Purpose |
|---|---|
| Model | Data definition and ORM access |
| View | Request processing and response logic |
| Template | HTML presentation |
| URL configuration | Maps a URL to a view |

The API returns JSON directly, so it does not need an HTML template. In MVC terms, Django's view performs much of the controller's work, and its template provides the presentation.

A project contains site-wide settings and URLs. An app is a module inside it. `manage.py` runs management commands; `settings.py` configures the project; `urls.py` selects views; `asgi.py` and `wsgi.py` are server entry points. ASGI supports asynchronous protocols, while WSGI is the traditional synchronous interface.

`makemigrations` creates migration files from model changes; `migrate` applies them. These lectures require a skeleton, not a Student database model, so `students/models.py` has no custom table. `migrate` creates Django's built-in tables.

## Result

The Django API setup and root JSON response are implemented. Run the shared checks from this directory for L26–L28. [L27 work](../L27/README.md) · [L28 work](../L28/README.md).

[Lecture source](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory/Unit%203/&f=L26%20Django%20Framework.md)
