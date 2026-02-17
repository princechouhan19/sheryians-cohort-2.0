# Full Stack Notes App 📝

A comprehensive Full Stack application for managing notes, built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates a complete workflow including backend API development and frontend integration.

## 🚀 Features

- **Create Notes**: Add new notes with a title and description.
- **Read Notes**: View all saved notes in a clean interface.
- **Update Notes**: Edit the description of existing notes.
- **Delete Notes**: Remove notes that are no longer needed.
- **Responsive Design**: Accessible on various device sizes.

## 🛠️ Tech Stack

### Backend

- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing notes.
- **Mongoose**: ODM for MongoDB interaction.
- **Dotenv**: Environment variable management.
- **Nodemon**: Development utility for auto-restarts.

### Frontend

- **React**: Library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Axios**: Promise-based HTTP client for API requests.
- **CSS**: Custom styling for a modern look.

## 📂 Project Structure

```bash
Backend/Day-8-FullStack/
│
├── Backend/          # Node.js & Express Server
│   ├── src/          # Source files (models, routes, logic)
│   ├── .env          # Environment variables (not committed)
│   ├── server.js     # Entry point
│   └── package.json  # Backend dependencies
│
└── Frontend/         # React Application (Vite)
    ├── src/          # React components and assets
    └── package.json  # Frontend dependencies
```

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) installed locally or a [MongoDB Atlas](https://www.mongodb.com/atlas/database) account.

### 1. Clone the Repository

```bash
git clone <repository_url>
cd Backend/Day-8-FullStack
```

### 2. Backend Setup

Navigate to the `Backend` directory and install dependencies:

```bash
cd Backend
npm install
```

**Configuration:**
Create a `.env` file in the `Backend` root directory and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Start the backend server:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### 3. Frontend Setup

Open a new terminal, navigate to the `Frontend` directory, and install dependencies:

```bash
cd ../Frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The application will typically run on `http://localhost:5173` (check the terminal output).

## � Connect Frontend to Backend (CORS Policy)

When connecting your React frontend (running on port `5173`) to your Node.js backend (running on port `3000`), you might encounter the following error in your browser console:

> Access to XMLHttpRequest at 'http://localhost:3000/api/notes' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

### What is CORS?

**CORS (Cross-Origin Resource Sharing)** is a security feature implemented by web browsers. It restricts web pages from making requests to a different domain (or port) than the one that served the web page. This prevents malicious scripts on one page from obtaining sensitive data from another.

### Why does this happen?

In this project:

- **Frontend Origin**: `http://localhost:5173`
- **Backend Origin**: `http://localhost:3000`

Since the ports are different (`5173` vs `3000`), the browser treats them as **different origins**. By default, browsers block requests between different origins for security reasons.

### How to Fix It

To allow the frontend to communicate with the backend, you need to enable CORS on the backend server.

1. **Install the `cors` package** in your backend directory:

   ```bash
   npm install cors
   ```

2. **Use it in your `app.js`**:

   ```javascript
   const cors = require("cors");
   app.use(cors()); // Enable CORS for all routes
   ```

   Or configure it specifically for your frontend:

   ```javascript
   app.use(
     cors({
       origin: "http://localhost:5173",
     }),
   );
   ```

## �📡 API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint         | Description               | Request Body (JSON)                        |
| ------ | ---------------- | ------------------------- | ------------------------------------------ |
| GET    | `/api/notes`     | Fetch all notes           | N/A                                        |
| POST   | `/api/notes`     | Create a new note         | `{ "title": "...", "description": "..." }` |
| PATCH  | `/api/notes/:id` | Update a note description | `{ "description": "..." }`                 |
| DELETE | `/api/notes/:id` | Delete a note             | N/A                                        |