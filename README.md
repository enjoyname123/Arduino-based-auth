# 🛡️ Secure Terminal Backend

A minimal Node.js/Express backend for an Arduino‑based authentication project.  
It provides a simple MongoDB‑backed API for registering devices/users and retrieving stored
payloads at login.

> **Note:** The name in `package.json` is `secure-terminal-backend`.

---

## 🔍 Features

- **Express** server with JSON body parsing and CORS enabled  
- **MongoDB** storage via Mongoose  
- Health‑check endpoint for uptime monitoring  
- Two main routes:
  - `POST /register` – create or update a user record
  - `POST /login` – return the payload for an existing user

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (or compatible)
- MongoDB instance (local or Atlas)

### Installation

```bash
git clone https://github.com/enjoyname123/Arduino-based-auth.git
cd Arduino-based-auth
npm install
```

### Configuration

The server reads one env variable:

| Variable     | Description                                       | Default                          |
|--------------|---------------------------------------------------|----------------------------------|
| `MONGO_URI`  | MongoDB connection string (MongoDB Atlas, etc.)   | `mongodb://localhost:27017/secureTerminal` |

Optionally set `PORT` to change the listening port (defaults to `3000`).

### Running

```bash
npm start
```

The app will log a connection message and listen on `http://localhost:3000/` (or the
specified port).

---

## 🛠 API Endpoints

### Health check

```http
GET /
```

Returns plain text `Server Awake`.

### Register / Update

```http
POST /register
Content-Type: application/json

{
  "userId": "<unique string>",
  "payload": "<associated data>"
}
```

- Creates a new user or updates an existing record.
- Response: `{ "message": "Success" }` on success.

### Login / Retrieve Data

```http
POST /login
Content-Type: application/json

{
  "userId": "<unique string>"
}
```

- Returns user payload if found.
- Success response: `{ "payload": "<stored value>" }`
- Errors:
  - `404` if the user ID is not found
  - `500` on database errors

---

## 📁 Project Structure

```
.
├── package.json
├── package-lock.json
├── server.js      # main Express app
├── index.html     # (static/demo frontend)
└── demo.html      # (optional additional demo page)
```

> Any Arduino‑specific frontend code likely resides in the HTML files; the backend
focuses solely on handling registration/login via HTTP.

---

## 📝 Notes

- The MongoDB schema enforces unique `userId` values.
- Intended for use with a companion web/Arduino client that posts to these routes.
- Easily deployable to platforms like [Render](https://render.com) by configuring
env vars.

---

Feel free to customise further with usage examples, license, or contribution
guidelines as your project grows!