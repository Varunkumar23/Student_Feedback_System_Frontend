# Student Feedback System - Backend

This is the backend part of the Student Feedback System, built with Node.js, Express, and MongoDB. It allows students to submit feedback for courses and provides analytics for course feedback.

## Features

- Add, update, delete, and list courses
- Submit feedback for courses
- View feedback for a specific course
- Get analytics (average rating, rating distribution) for course feedback

## Project Structure

```
.
├── config/
│   └── db.js
├── controllers/
│   ├── courseController.js
│   └── feedbackController.js
├── models/
│   ├── Course.js
│   └── Feedback.js
├── routes/
│   ├── courseRoute.js
│   └── feedbackRoute.js
├── server.js
├── package.json
└── .gitignore
```

## Setup

1. **Clone the repository**
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Create a `.env` file** in the root directory and add your MongoDB URI:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```
4. **Run the server**
   ```sh
   npm run dev
   ```
   The server will start on port `5000` by default.

## API Endpoints

### Courses

- `POST /api/courses` - Create a new course
- `GET /api/courses` - Get all courses (with average rating)
- `GET /api/courses/:id` - Get course details and feedback analytics
- `PUT /api/courses/:id` - Update a course
- `DELETE /api/courses/:id` - Delete a course

### Feedback

- `POST /api/feedback` - Add feedback for a course
- `GET /api/feedback/:courseId` - Get feedback for a course
- `GET /api/feedback/analytics/:courseId` - Get feedback analytics for a course

## Technologies Used

- Node.js
- Express
- MongoDB & Mongoose
- dotenv
- cors

