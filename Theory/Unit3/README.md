# Unit 3: Frameworks and APIs

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

Completed the lecture activities from L25 to L28. L25 contains the Express server. L26 creates one Django project, and L27 and L28 extend that same project instead of repeating it.

| Lecture | Activity | Files |
|---|---|---|
| [L25](L25/README.md) | Express project and root response | `L25/app.js`, `package.json` |
| [L26](L26/README.md) | Django setup, project/app structure and JSON response | `L26/manage.py`, `student_system/`, `students/` |
| [L27](L27/README.md) | Logging middleware, list/detail routes and routing error exercise | `L26/students/middleware.py`, `urls.py`, `views.py` |
| [L28](L28/README.md) | External API utility, timeout handling and mocked tests | `L26/students/utils.py`, `views.py`, `tests.py` |

## Run

Express, from `L25`:

```bash
npm ci
npm start
```

Open http://localhost:3000/ .

Django, from `L26`:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py check
python manage.py test
python manage.py runserver
```

Open http://127.0.0.1:8000/ . The same server runs the L27 and L28 endpoints. If port 8000 is busy, use `python manage.py runserver 8001` and replace the port in requests.

This is a local learning project. SQLite and virtual environments are ignored by Git. The Django settings use local development defaults. GitHub Pages displays links to the source; it does not execute these servers.

## Verification — 28 October 2026

- Express root checked over HTTP: status 200 and `API is running`.
- Django configuration check: no issues.
- Migration check: no missing model changes; built-in migrations applied successfully.
- Django test suite: 14 tests passed, covering routing, middleware output and external-service success/failure cases.
- External requests in tests are mocked; these checks do not claim live JSONPlaceholder availability.

## Remaining Lectures

L29 onward is not included in this update. Unit 2 L17–L24 remains a separate pending section; adding Unit 3 does not mark it completed.
