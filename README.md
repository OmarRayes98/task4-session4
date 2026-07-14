# Humanvolve User Management API

## Project Description

This project is a REST API for **Humanvolve User Management**.

The API provides CRUD operations with:

- User Authentication using JWT
- Role-based Authorization
- Protected routes
- Admin permission for deleting users
- User search by email

The project uses Node.js v24 and MongoDB.

---

# Installation

## Requirements

- Node.js v24
- MongoDB

Install dependencies:

```bash
npm install
```

---

# Environment Setup

Create a `.env` file based on `.env.example`.

Add:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

---

# Run Project

```bash
npm run dev
```

The server runs on:

```
http://localhost:3001
```

---

# API Routes

Base URL:

```
http://localhost:3001/users
```

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user and get token | No |
| GET | `/` | Get all users | No |
| GET | `/:id` | Get user details | Required |
| GET | `/search?email=` | Search user by email | Required |
| PUT | `/:id` | Update user | Required |
| DELETE | `/:id` | Delete user | Required + Admin |

---

# Authentication

For protected routes, send JWT token in headers:

```
Authorization: Bearer <token>
```

---

# Seed Data

A seed file is included to create example users when the database is empty.

It creates users with different roles for testing:

- Admin user
- Normal user

---

# Postman Collection

The Postman collection is included in the project folder:

```
/postman
```

Import it into Postman to test all APIs.
