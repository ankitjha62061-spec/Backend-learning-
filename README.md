# Backend Learning Journey 🚀

Welcome to the **Backend Learning** repository! This project serves as a comprehensive playground and reference guide for mastering backend development concepts. It covers building scalable REST APIs, structuring applications using best practices, managing databases, and implementing secure user authentication flows.

## 💻 Tech Stack & Core Languages

This repository heavily utilizes the **MERN / Node.js ecosystem** to build lightweight, fast, and robust backend services.

* **Language:** JavaScript (Node.js runtime environment)
* **Framework:** Express.js (for fast, minimalist web routing and HTTP request handling)
* **Database:** MongoDB (NoSQL Database used to securely store application and user data)
* **ORM/ODM:** Mongoose (for data modeling, schema validation, and database connections)
* **Authentication:** JSON Web Tokens (JWT) & bcryptjs

---

## 🔐 Authentication Flow (How Login & Signup Work)

Secure user authentication is implemented using standard industry practices: password hashing and stateless token-based authorization.

### 1. User Signup (Registration)
* **Step 1:** The user submits their details (`name`, `email`, `password`) via a `POST` request to the `/api/auth/signup` endpoint.
* **Step 2:** The backend validates the input to ensure all fields are complete and the email isn't already registered.
* **Step 3 (Security):** The plain-text password is encrypted using **bcryptjs** (hashed with a salt factor) before hitting the database. *Plain passwords are never saved.*
* **Step 4:** The new user record with the hashed password is created and saved in MongoDB.

### 2. User Login (Authentication & Session)
* **Step 1:** The user submits their credentials (`email`, `password`) via a `POST` request to `/api/auth/login`.
* **Step 2:** The backend checks if a user exists with that specific email.
* **Step 3:** The backend uses `bcrypt.compare()` to match the incoming plain-text password with the secure hashed password stored in the database.
* **Step 4:** If authorization is successful, the server generates a **JSON Web Token (JWT)** signed with a unique `JWT_SECRET` key.
* **Step 5:** The server responds with a success status and sends the JWT token back to the client. The client can then store this token (e.g., in `localStorage` or HttpOnly cookies) and include it in the headers of future requests to access protected routes.

---

## 🗂️ Project Structure

The project follows a clean **MVC (Model-View-Controller)** pattern or standard layered architecture to separate concerns beautifully:

```text
├── config/             # Database connection and environment configurations
├── controllers/        # Business logic for handling requests (e.g., authController.js)
├── models/             # Mongoose schemas defining database structure (e.g., User.js)
├── routes/             # Express routing paths mapping endpoints to controllers
├── middleware/         # Custom route guards (e.g., checking if a user is logged in via JWT)
├── .env.example        # Reference file for environment variables
├── server.js           # Main application entry point
└── package.json        # Project dependencies and script configurations
