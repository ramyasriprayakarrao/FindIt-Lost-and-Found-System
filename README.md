# FindIt
A lost-and-found website built with HTML, CSS, JavaScript, Node.js, Express and MySQL.

## Setup
1. Install Node.js and MySQL.
2. Run `database/schema.sql` in MySQL Workbench.
3. Edit `.env` and set your MySQL password and a long JWT secret.
4. In the project root terminal run `npm install` then `npm run dev`.
5. Open `frontend/index.html` with VS Code Live Server.
6. Register, log in, and create/search reports.

Backend health check: http://localhost:3000/api/health

Never publish `.env`. This is a learning project; add stricter deployment security before production use.
