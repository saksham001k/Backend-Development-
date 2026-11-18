# L44–L45 — Backend API Test Automation

Saksham Katiyar · SAP ID: 590015169

## Aim

Create the lecture's FastAPI arithmetic server, test it using Requests and pytest, and run the same checks automatically with GitHub Actions.

## Files

| File | Work |
| --- | --- |
| `apiserver.py` | Root, addition, subtraction and multiplication routes |
| `testAutomation.py` | Three basic HTTP tests using Requests |
| `automation_test_pytest.py` | Parameterized calculations, edge cases and invalid-input checks |
| `requirements.txt` | Required Python packages |
| [API test workflow](../../../.github/workflows/backend-api-tests.yml) | Starts the server and runs both test scripts |

This exercise sits alongside the earlier Unit 4 Docker-project reference. The arithmetic app follows this lecture; it does not replace the Student API or add database, authentication or load-testing features.

## Run locally

From the main Backend Development repository:

```bash
cd Theory/Unit4/L44-L45
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python apiserver.py
```

Open http://127.0.0.1:8000/docs. Try `/add/2/2`, `/subtract/2/2` and `/multiply/2/2`.

Keep the server terminal open. In a second terminal:

```bash
cd "/Users/sakshamkatiyar/Documents/sem5/Backend /Backend-Development-/Theory/Unit4/L44-L45"
source .venv/bin/activate
python testAutomation.py
python -m pytest automation_test_pytest.py -v
```

The Requests script checks three normal calculations. Pytest checks eight calculations, three non-integer requests returning HTTP 422, and the root response: 12 tests in total. A running server is required because these are real HTTP integration tests.

To test a server on another port, set `BASE_URL`, for example `BASE_URL=http://127.0.0.1:8001 python testAutomation.py`. Stop Uvicorn with Ctrl+C.

## How it works

1. Uvicorn runs FastAPI on port 8000.
2. Requests sends HTTP GET requests to the routes.
3. FastAPI validates the integer path values and returns the calculation as JSON.
4. Assertions check the HTTP status and expected result. An incorrect result fails the test.
5. Pytest runs one test for each parameter set and reports individual results.
6. GitHub Actions installs dependencies, starts the server, waits until it responds and runs both scripts on relevant pushes and pull requests. It can also be started manually.

## Verification

On 18 November 2026, all three Requests checks and all 12 pytest cases passed against a live local Uvicorn server using Python 3.12. GitHub Actions verification is checked after upload. Optional production extensions discussed in the slides are not part of this small exercise.

## References

- [L44–L45 lecture](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory/Unit%204/&f=L44-L45%20Github%20Actions%20Test%20Automation%20Backend%20API%20testing.md)
- [Lecturer's resource](https://github.com/upessocs/devops-test-automation)
- [Unit 4 index](../README.md)
