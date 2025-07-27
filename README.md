**Frontend:**
- React (with React Router)
- Axios for API calls

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose

**Installation**
Setup Backend
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```bash
npm start
```

Setup Frontend
```bash
cd ../frontend
npm install
npm start
```
The React app will start on [http://localhost:3000](http://localhost:3000).

### Task Routes
- `GET /api/tasks` – Fetch all tasks.
- `POST /api/tasks` – Create a new task.
- `PUT /api/tasks/:id` – Update task (e.g., status).
- `DELETE /api/tasks/:id` – Delete task.

### User Routes
- `GET /api/users` – Fetch all users.
- `POST /api/users` – Create a new user.
- `DELETE /api/users/:id` – Delete user.
