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


## Practical 5 — MongoDB Integration with Mongoose

- Connected Express server to MongoDB Atlas using Mongoose, via `config/db.js`
- Task schema: `title` (required), `description`, `completed` (default false), `priority` (enum: low/medium/high, default low), `createdAt` (default now)
- Pre-save hook trims whitespace from `title` on document creation
- All CRUD routes now use Mongoose model methods instead of an in-memory array
- Validation errors returned as structured JSON, not raw Mongoose error objects
- `GET /tasks/:id` added with 404 for missing tasks and 400 for malformed ObjectIds
- `.env` holds `MONGO_URI`; `.env.example` provided as a template, `.env` excluded via `.gitignore`

### Run Locally
```bash
npm install
Copy-Item .env.example .env   # PowerShell — then fill in your own MONGO_URI
npm run dev
```

## Practical 6 — CORS for Frontend Integration

- Enabled `cors` middleware to allow requests from the React dev server (`localhost:5173`)
- Connected to and tested against the `portfolio-d25it121` frontend's Tasks page