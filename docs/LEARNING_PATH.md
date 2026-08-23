# Fast Learning Path

The goal is not to memorize every line. Learn the request flow and know where each responsibility lives.

## Pass 1 — understand the app

Run it and perform this sequence:

1. Register.
2. Create a task.
3. Edit the task.
4. Delete the task.
5. Log out and log in again.

That proves the auth flow, CRUD flow, persistence, and frontend/backend integration.

## Pass 2 — learn six files

### `AuthController.java`
Learn: register, login, password verification, token creation.

### `SecurityConfig.java`
Learn: public vs protected routes, stateless security, JWT validation, BCrypt, CORS.

### `TaskController.java`
Learn: REST CRUD methods and how `authentication.getName()` identifies the logged-in user.

### `auth.service.ts`
Learn: Angular calls login/register and stores the JWT.

### `auth.interceptor.ts`
Learn: the interceptor attaches `Authorization: Bearer <token>` automatically.

### `tasks.component.ts`
Learn: the UI calls create/read/update/delete operations.

## Pass 3 — say the flow without looking

> Angular sends username and password to Spring Boot. Spring Security checks the BCrypt password. If valid, the backend creates a signed JWT. Angular stores it and an HTTP interceptor attaches it to later requests. Spring Security validates that JWT before protected requests reach the task controller. The controller uses the authenticated username to query only that user's tasks in PostgreSQL.

If you can explain that paragraph and point to the six files above, you understand the project well enough for a junior full-stack interview.

## Pass 4 — understand Jenkins

The `Jenkinsfile` has three stages:

1. `mvn test` for the backend.
2. `npm install` + `npm run build` for Angular.
3. `docker compose config` to validate Compose syntax.

You can accurately say you wrote Jenkins pipeline syntax. Do not claim production Jenkins administration unless you actually do that later.
