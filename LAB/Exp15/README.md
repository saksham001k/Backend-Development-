# Experiment 15: Django To-Do App

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

One Django and SQLite application covering both Experiment 15 lab manuals, now extended with the Theory L28 third-party API activity. CRUD, the v2 template/admin/static-file work and the external API integration are all in this same folder.

## Work done

- Add a task and display tasks from newest to oldest.
- Mark a task complete or incomplete, and delete it.
- Store tasks in SQLite so they remain after restarting the server.
- Use POST forms with CSRF tokens for changes.
- Register Task in Django Admin with columns, completion filter and title search.
- Reuse `base.html`, `header.html` and `footer.html` with `extends` and `include`.
- Load separate CSS, JavaScript and a PNG logo with Django's static tag.
- Use a responsive layout. The Add Task page demonstrates the `extra_js` block by focusing the input.

- Extend the app with L28: fetch a post through a service utility, use a two-second Requests timeout and return HTTP 503 for external failures.

## Run on macOS

```bash
cd "/Users/sakshamkatiyar/Documents/sem5/Backend /Backend-Development-"
git pull --ff-only origin main
cd LAB/Exp15
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py runserver
```

Open http://127.0.0.1:8000/ . Stop the server with Ctrl+C. On the next run, activate `.venv` and run `python manage.py runserver` from this folder.

For Django Admin, stop the server, run `python manage.py createsuperuser`, then start it again and open http://127.0.0.1:8000/admin/ . Create your own local admin account; no account or database is included in Git.

## Routes

| Method | URL | Work |
|---|---|---|
| GET | `/` | List tasks |
| GET, POST | `/add/` | Show form and add task |
| POST | `/toggle/<id>/` | Change completed state |
| POST | `/delete/<id>/` | Delete task |
| GET, POST | `/admin/` | Django's built-in admin |
| GET | `/api/external/<post_id>/` | Read a JSONPlaceholder post through the L28 service utility |

## Files and working

`todo_project/settings.py` configures the app and SQLite. Project URLs include `todo/urls.py`. A view reads or changes the Task model through Django's ORM, then renders an HTML template or redirects. `created_at` is set on the server when a task is first saved.

The model stores `title`, `completed` and `created_at`; Django supplies an integer ID. The migration is committed. `db.sqlite3`, virtual environments and local configuration are ignored.

| File or feature | Purpose |
|---|---|
| `admin.py` | Register Task and customize the admin listing |
| `apps.py` | Configure the app name, label and default ID field |
| `extends` | Inherit the document layout from `base.html` |
| `include` | Insert the shared header or footer fragment |
| `static/todo/` | Namespaced CSS, JavaScript and logo |

This is a local lab project. `DEBUG=True` and the fallback development key are for local execution. GitHub Pages links to its source; it does not execute Django.

## Theory L28 extension

Select **External API** in the shared header, or open http://127.0.0.1:8000/api/external/1/ while the Django server is running.

`todo/utils.py` calls `https://jsonplaceholder.typicode.com/posts/{post_id}` using `requests.get(..., timeout=2)`, checks the HTTP status and decodes JSON. `todo/views.py` calls the utility and returns the post as JSON with HTTP 200, or a safe error with HTTP 503. The external post is displayed as JSON; it is not inserted into the To-Do database.

The timeout limits connection/read waits; it is not a guaranteed two-second total deadline. The endpoint needs internet access. If the dependency fails, a response such as `{"error":"External service timed out"}` is expected. This demonstrates the L28 failure handling.

## Verification

```bash
python manage.py test
python manage.py makemigrations --check --dry-run
```

All 20 Django tests passed on 28 October 2026. Ten cover the original To-Do work. Ten cover the external API utility, exact URL/timeout, HTTP/network/JSON failures, route responses, GET-only access and invalid IDs. The integration tests use `unittest.mock`, so they do not depend on the live service. See [Report.md](Report.md) for verification details and the original app screenshots.

## Lab references

- [Experiment 15 v1 Basic](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Lab/&f=Exp%2015%20Django%20Todo%20App%20v1%20Basic.md)
- [Experiment 15 v2](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Lab/&f=Exp%2015%20Django%20Todo%20App%20v2.md)


- [Theory L28 activity](../../Theory/Unit3/L28/README.md)
