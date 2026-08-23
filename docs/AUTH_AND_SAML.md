# JWT Authentication and How It Relates to SAML SSO

## What this project actually implements

This project implements **JWT-based authentication**. It does **not** implement SAML.

The flow is:

1. The user sends a username and password to `/api/auth/login`.
2. Spring Security verifies the credentials with a `UserDetailsService` and BCrypt password hashing.
3. The backend creates a signed JWT containing the username as the subject (`sub`) and an expiration time.
4. Angular stores the JWT in `localStorage` for this implementation.
5. An Angular HTTP interceptor adds `Authorization: Bearer <token>` to API requests.
6. Spring Security verifies the JWT signature and expiration before allowing access to protected endpoints.
7. Controllers use the authenticated principal's username to make sure users only access their own tasks.

For production systems, token storage and refresh/revocation strategy should be chosen based on the threat model. `localStorage` is used here to keep the authentication flow straightforward to inspect.

## Conceptual mapping to SAML

JWT and SAML are different technologies, but both can carry signed identity information that another system trusts.

### In this project

- The **Spring Boot backend** authenticates the username/password itself.
- The backend is also the component that **issues the JWT**.
- The Angular app later presents that JWT to the API.

### In a typical SAML SSO flow

- The **Identity Provider (IdP)** authenticates the user, for example an enterprise identity platform.
- The **Service Provider (SP)** is the application the user wants to access.
- The IdP sends a signed **SAML assertion** to the SP.
- The SP validates the assertion and establishes an authenticated application session.

A simple conceptual comparison is:

| This JWT project | Typical SAML SSO |
|---|---|
| Backend authenticates credentials | IdP authenticates user |
| Backend issues signed JWT | IdP issues signed SAML assertion |
| API validates JWT | SP validates SAML assertion |
| JWT subject identifies user | SAML NameID/attributes identify user |
