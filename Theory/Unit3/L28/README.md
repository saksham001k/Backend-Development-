# Lecture 28: Integrating Third-Party APIs and Services

**Name:** Saksham Katiyar  
**SAP ID:** 590015169

## Objective

Read a post from an external API through a service utility, handle failures and test the integration without using the internet.

## Source Files

- [Service utility](../L26/students/utils.py)
- [View](../L26/students/views.py)
- [URL route](../L26/students/urls.py)
- [Mocked tests](../L26/students/tests.py)

## Work Done

1. Added `requests` to the shared Django requirements.
2. Kept the external call in `get_external_data()` rather than inside the view.
3. Called JSONPlaceholder's `/posts/{post_id}` endpoint with `timeout=2`.
4. Used `raise_for_status()` and decoded the returned JSON.
5. Handled timeout, connection/HTTP failure, invalid JSON and an unexpected response shape.
6. Returned HTTP 503 with a safe error message when the dependency fails.
7. Added mocks for successful and unsuccessful responses so tests do not call the real service.

## Run

Start the shared server from [L26](../L26/README.md):

```bash
curl -i http://127.0.0.1:8000/api/students/external/1/
```

This request uses the internet. A working dependency returns the post JSON with HTTP 200. If the service cannot be reached, the API returns HTTP 503, for example:

```json
{"error":"External service timed out"}
```

The Requests `timeout=2` setting limits connection/read waits; it is not a guaranteed two-second limit for the entire request.

## Test Without the Internet

From `L26`:

```bash
python manage.py test students.tests.ExternalDataTests
```

The tests patch `students.utils.requests.get`. They check the exact URL and timeout, successful JSON, timeout, network/HTTP errors, invalid JSON, and a non-object response. Route checks confirm successful JSON returns 200 and timeout returns 503. Live third-party availability is not a requirement for these tests.

## Result

The external integration, controlled failure responses and mocked checks are implemented in the same Student Management project. External services can supply data and features while a service layer keeps their network behaviour separate from view logic.

[Lecture source](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory/Unit%203/&f=L28%20Integrating%20Third-Party%20APIs%20and%20Services.md)
