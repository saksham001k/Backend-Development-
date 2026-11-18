# Unit 4 — Docker Compose vs Docker Run

Saksham Katiyar · SAP ID: 590015169

`docker run` creates and starts one container per command. Docker Compose reads a YAML file and manages a group of services, networks and volumes as one project.

## 1. Same Nginx page, two ways

Start Docker Desktop and run these commands from this folder. If your earlier FastAPI Docker demo is using port 8080, stop it from its own folder first.

```bash
docker run -d --name unit4-nginx \
  -p 127.0.0.1:8080:80 \
  -v "$PWD/html:/usr/share/nginx/html:ro" \
  -e NGINX_HOST=localhost --restart unless-stopped nginx:alpine
curl -fsS http://127.0.0.1:8080/
docker stop unit4-nginx
docker rm unit4-nginx

docker compose up -d
curl -fsS http://127.0.0.1:8080/
docker compose ps
docker compose logs nginx
docker compose down
```

Both setups serve the same `html/index.html`. Run them one at a time because they share the same container name and host port. The mount is read-only; editing the source HTML on your Mac changes what Nginx serves.

| Docker Run | Compose equivalent |
|---|---|
| Image argument | `image` |
| `--name` | `container_name` |
| `-p` | `ports` |
| `-v` | `volumes` |
| `-e` | `environment` |
| `--network`, `--network-alias` | Service `networks` and `aliases` |
| `--restart` | `restart` |
| `-w`, `--user`, `--hostname` | `working_dir`, `user`, `hostname` |
| Arguments after the image | `command` |
| `--entrypoint` | `entrypoint` |
| `--memory`, `--cpus` | `mem_limit`, `cpus` |
| `-d` | `docker compose up -d` |

## 2. WordPress with MySQL

The example passwords are for this localhost-only exercise. MySQL has no published host port.

**Docker Run:** create a network and persistent volumes, then start MySQL.

```bash
docker network create unit4-wp
docker volume create unit4-mysql-data
docker volume create unit4-wp-content
docker run -d --name unit4-db --network unit4-wp --network-alias db \
  -e MYSQL_ROOT_PASSWORD=local-root-only -e MYSQL_DATABASE=wordpress \
  -e MYSQL_USER=wpuser -e MYSQL_PASSWORD=local-wp-only \
  -v unit4-mysql-data:/var/lib/mysql mysql:8.4
```

Run this check until it prints `1`, then start WordPress:

```bash
docker exec unit4-db mysql --protocol=tcp -h 127.0.0.1 \
  -u wpuser -plocal-wp-only wordpress -e 'SELECT 1'
docker run -d --name unit4-wordpress --network unit4-wp \
  -p 127.0.0.1:8081:80 -e WORDPRESS_DB_HOST=db:3306 \
  -e WORDPRESS_DB_USER=wpuser -e WORDPRESS_DB_PASSWORD=local-wp-only \
  -e WORDPRESS_DB_NAME=wordpress \
  -v unit4-wp-content:/var/www/html/wp-content wordpress:php8.3-apache
```

Open [WordPress setup](http://localhost:8081/). Stop and remove the containers before trying Compose:

```bash
docker stop unit4-wordpress unit4-db
docker rm unit4-wordpress unit4-db
docker network rm unit4-wp
```

**Compose:** the YAML declares both services, their shared default network, and their named volumes. The database health check runs a query; WordPress waits for `service_healthy`. Plain `depends_on` only establishes startup order.

```bash
docker compose -f wordpress.compose.yaml up -d --wait
docker compose -f wordpress.compose.yaml ps
docker compose -f wordpress.compose.yaml down
```

Open the same [WordPress setup page](http://localhost:8081/) before running `down`. The two methods use separate named volumes, so they start with separate WordPress data. Cleanup above leaves the data intact.

## Takeaway

Use `docker run` for quick individual containers. Use Compose when you want a repeatable setup in Git, a shared network and one command for the whole stack. Compose can also build custom images with `build` and scale services with `up --scale worker=2`; services being scaled should avoid fixed container names or conflicting host ports.

[Course lesson](https://upessocs.github.io/#d=/Lectures/Backend%20Development/Theory/Unit%204/Docker%20Handson/&f=5%20Docker%20Compose%20vs%20Docker%20Run.md) · [Unit 4 index](../README.md)
