# MERN Stack - List Distribution App

This is a full-stack web application that allows an admin to log in, manage a list of agents, and upload a CSV file of tasks which are then automatically distributed among the agents.

---

## Features

- **Admin Authentication:** Secure login for the admin user using JWT (JSON Web Tokens).
- **Agent Management:** Functionality to create new agents who can be assigned tasks.
- **CSV Upload:** Upload a list of tasks in a CSV file.
- **Automatic Distribution:** Tasks from the uploaded list are automatically and evenly distributed among the available agents.
- **Dynamic Display:** The dashboard displays the distributed task lists for each agent in real-time after an upload.
- **Responsive UI:** The user interface is built with Tailwind CSS and is responsive for both desktop and mobile devices.

---

## Tech Stack

- **Frontend:** React.js (with Vite), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

---

## Setup and Installation

To run this project locally, follow these steps:

### Prerequisites

- Node.js installed
- MongoDB (either local or a free MongoDB Atlas cluster)

### 1. Clone the Repository

```bash
git clone [https://github.com/harsaroop-dev/mern-cstech-assignment.git](https://github.com/harsaroop-dev/mern-cstech-assignment.git)
cd mern-cstech-assignment
```

### 2. Backend Setup

```bash
cd backend

npm install

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
PORT=5000

node server.js
```

### 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

The application will be available at `http://localhost:5173`.
