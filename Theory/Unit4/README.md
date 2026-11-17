# Unit 4 — FastAPI Docker Hands-on

Saksham Katiyar · SAP ID: 590015169

This task is kept in its own repository as required by the tutorial. Only this reference is stored in the main coursework repository.

- [Source and full run instructions](https://github.com/saksham001k/fastapi-docker-handson)
- [Successful GitHub Actions run](https://github.com/saksham001k/fastapi-docker-handson/actions/runs/44060310292)
- [Course theory index](../README.md)
- [Course website](https://saksham001k.github.io/Backend-Development-/#unit4)

## Work done

A FastAPI Student API with `/`, `/health` and `/students`, request timing/logging, Docker packaging, Docker Hub publishing, two API instances behind Nginx and a GitHub Actions workflow.

## Verification

Five API tests, Docker build, two-instance startup, 20 load-balanced requests, Intel/AMD and Apple Silicon publishing, and pulling/running the published image passed in Actions. Local Compose startup and requests to the root, students, health and docs routes were confirmed on my Mac on 17 November 2026. Nginx logs showed both upstream instances. The separate visible source-change → push → updated-image demonstration remains to be recorded; this reference does not claim all Unit 4 lectures are complete.

## Run locally

Start Docker Desktop, then clone this separate project beside the course repository:

```bash
cd ~/Documents
git clone https://github.com/saksham001k/fastapi-docker-handson.git
cd fastapi-docker-handson
docker compose up -d --build --wait
```

Open http://localhost:8080/students or http://localhost:8080/docs. These commands build the image locally; Docker Hub login is not needed.

For an existing clone, run `git pull --ff-only origin main` inside that folder before rebuilding. Stop with `docker compose down`.
