# Task Manager API

A RESTful backend for a task management system, built with Node.js and Express, as part of Advanced Web Development Frameworks (ITUE301) practical coursework.

## Practical 4: RESTful API with Express

### Objective
Design and implement a RESTful backend server with complete CRUD endpoints using an Express middleware pipeline.

### Endpoints
- `GET /tasks` — list all tasks
- `POST /tasks` — create a task
- `PUT /tasks/:id` — update a task
- `DELETE /tasks/:id` — delete a task

### Middleware Pipeline
1. `express.json()` — parses JSON request bodies
2. `logger` — logs method, URL, and timestamp for every request
3. `validateContentType` — rejects POST/PUT requests missing `Content-Type: application/json`
4. `validateTaskId` (route-specific) — validates `:id` is a positive integer before reaching the controller
5. 404 handler — catches undefined routes
6. `errorHandler` — global error handler, always last

### Data
In-memory array (no database yet — MongoDB integration is Practical 5).

### Run Locally
```bash
npm install
node server.js
```
Server runs on `http://localhost:5000`.

### Technologies
- Node.js
- Express
- Postman (testing)