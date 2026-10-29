# Task 4: Authenticated Full-Stack Employee Manager

React (Vite) + Express + MongoDB Atlas. Both frontend and backend are deployed on Vercel.

## Features
- Register / Login (passwords hashed with bcrypt, JWT authentication)
- Protected API routes (auth middleware)
- Data isolation: each user can only see their own employees
- Employee CRUD (GET, POST, PUT, DELETE) with search

## Folder structure
- `/backend`: Express API (config, models, controllers, routes, middleware)
- `/frontend`: React app

## Run locally
Backend: `cd backend`, create `.env` (see `.env.example`), `npm install`, `npm run dev`
Frontend: `cd frontend`, create `.env` (see `.env.example`), `npm install`, `npm run dev`

## Environment variables
- Backend: `MONGO_URI`, `JWT_SECRET`
- Frontend: `VITE_API_URL` (the deployed backend URL)

## API endpoints
| Method | Route | Auth | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Create a new user |
| POST | /api/auth/login | No | Login, returns a token |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/employees | Yes | Get your employees |
| POST | /api/employees | Yes | Create an employee |
| PUT | /api/employees/:id | Yes | Update an employee |
| DELETE | /api/employees/:id | Yes | Delete an employee |

## Database schemas
- **User**: name, email (unique), password (hashed)
- **Employee**: name, email, position, department, salary, user (reference to User)

## Live links
- Frontend: https://employee-manager-fullstack-a65s.vercel.app
- Backend:  https://employee-manager-fullstack.vercel.app
