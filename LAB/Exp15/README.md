# Experiment 15: Django To-Do App

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

One Django and SQLite application covering both Experiment 15 lab manuals. The basic CRUD work and the v2 template, admin and static-file work are in this same folder.

## Work done

- Add a task and display tasks from newest to oldest.
- Mark a task complete or incomplete, and delete it.
- Store tasks in SQLite so they remain after restarting the server.
- Use POST forms with CSRF tokens for changes.
- Register Task in Django Admin with columns, completion filter and title search.
- Reuse `base.html`, `header.html` and `footer.html` with `extends` and `include`.
- Load separate CSS, JavaScript and a PNG logo with Django's static tag.
- Use a responsive layout. The Add Task page demonstrates the `extra_js` block by focusing the input.

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

## Verification

```bash
python manage.py test
python manage.py makemigrations --check --dry-run
```

Ten Django tests cover CRUD, empty state, validation, template reuse, CSRF, POST-only changes, missing IDs, escaped titles and admin search/filter. See [Report.md](Report.md) for verification evidence and screenshots.

## Lab references

- [Experiment 15 v1 Basic](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Lab/&f=Exp%2015%20Django%20Todo%20App%20v1%20Basic.md)
- [Experiment 15 v2](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Lab/&f=Exp%2015%20Django%20Todo%20App%20v2.md)
