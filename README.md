# Task Tracker — Angular + Spring Boot + JWT

A full-stack task management application built with Angular, Spring Boot, PostgreSQL, and JWT authentication.

Users can:
- register and log in;
- receive a JWT after successful authentication;
- create, read, update, and delete their own tasks;
- log out by removing the token from browser storage.

## Stack

- **Frontend:** Angular 21, TypeScript, standalone components
- **Backend:** Spring Boot 3.5, Java 21, Spring Web, Spring Data JPA
- **Security:** Spring Security + JWT bearer authentication
- **Database:** PostgreSQL 16 through Docker Compose
- **CI:** Declarative Jenkinsfile

## Architecture

```text
Browser (Angular)
    |
    | POST /api/auth/login -> JWT
    | Authorization: Bearer <token>
    v
Spring Boot REST API
    |
    | Spring Security validates JWT
    | Controller -> Repository
    v
PostgreSQL
```

## Run locally

### Prerequisites

- Java 21+
- Maven 3.6.3+
- Node.js 22.x
- Docker Desktop

### 1. Start PostgreSQL

From the repository root:

```bash
docker compose up -d
```

### 2. Start Spring Boot

```bash
cd backend
mvn spring-boot:run
```

Backend: `http://localhost:8080`

### 3. Start Angular

In another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend: `http://localhost:4200`

### 4. Try the app

1. Open `http://localhost:4200`.
2. Register a user.
3. Add a few tasks.
4. Edit, mark complete, and delete tasks.
5. Log out and log back in.

## API

| Method | Route | Auth | Purpose |
|---|---|---:|---|
| POST | `/api/auth/register` | No | Create account and return JWT |
| POST | `/api/auth/login` | No | Verify credentials and return JWT |
| GET | `/api/tasks` | Yes | List current user's tasks |
| POST | `/api/tasks` | Yes | Create a task |
| PUT | `/api/tasks/{id}` | Yes | Update own task |
| DELETE | `/api/tasks/{id}` | Yes | Delete own task |

Example login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"username":"gopal","password":"password123"}'
```

Then call a protected endpoint:

```bash
curl http://localhost:8080/api/tasks \
  -H 'Authorization: Bearer YOUR_TOKEN'
```

## Configuration

Defaults are intentionally local-development friendly. Override them with environment variables:

```bash
export DB_URL=jdbc:postgresql://localhost:5432/tasktracker
export DB_USERNAME=taskuser
export DB_PASSWORD=taskpass
export JWT_SECRET='replace-with-a-long-random-secret-at-least-32-bytes'
```

Do not commit a production JWT secret.
