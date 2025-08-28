
# 🎓 Student Feedback System with Aggregated Analytics

A full-stack application where students can provide feedback on courses by submitting **ratings (1–5)** and **comments**.
The system aggregates this data to display **average ratings** and **rating distribution (charts)** for each course.

---

## 🚀 Features

### 🔹 Backend (Node.js + Express + MongoDB)

* CRUD operations for **Courses** (name, code, description).
* Submit feedback with **student name, rating, and comment**.
* Aggregated analytics per course:

  * Average rating
  * Rating distribution (1–5 counts)
* RESTful APIs for frontend consumption.

### 🔹 Frontend (React + Vite + CSS + Chart.js/Recharts)

* Course list with **average ratings**.
* Feedback form for submitting ratings and comments.
* Analytics dashboard with **bar/pie charts** showing rating distribution.
* `/admin` route to **manage courses** (CRUD).

---

## 🌐 Hosted Links

* **Backend (Express + MongoDB Atlas):**
  👉 https://infinitelocus-backend-5r1w.onrender.com

* **Frontend (React + Vercel):**
  👉 https://infinite-locus-group5.vercel.app/

---

## 🗂️ Tech Stack

* **Frontend:** React (Vite), CSS, Chart.js/Recharts
* **Backend:** Node.js, Express.js
* **Database:** MongoDB + Mongoose
* **Other:** CORS, Axios

---

## 📂 Project Structure

```
student-feedback-system/
│
├── backend/
│   ├── server.js            # Entry point
│   ├── config/db.js         # MongoDB connection
│   ├── models/              # Mongoose schemas
│   │   ├── Course.js
│   │   └── Feedback.js
│   ├── controllers/         # Business logic
│   │   ├── courseController.js
│   │   └── feedbackController.js
│   ├── routes/              # API routes
│   │   ├── courseRoutes.js
│   │   └── feedbackRoutes.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Pages (CourseList, FeedbackForm, Analytics, AdminPage)
│   │   ├── api/             # Axios API calls
│   │   └── App.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation (Local Setup)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Shinkhal/InfiniteLocus_Group5
cd InfiniteLocus_Group5
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=mongodb://localhost:27017/student_feedback
PORT=5000
```

Run backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Courses

* `POST /api/courses` → Create a course
* `GET /api/courses` → Get all courses with avg rating
* `GET /api/courses/:id` → Get single course with analytics
* `PUT /api/courses/:id` → Update course
* `DELETE /api/courses/:id` → Delete course

### Feedback

* `POST /api/feedback` → Add feedback (fullName, rating, comment)
* `GET /api/feedback/:courseId` → Get feedback for a course
* `GET /api/feedback/analytics/:courseId` → Get avg + rating distribution

---

## 📊 Sample API Responses

**GET /api/courses**

```json
[
  {
    "_id": "64a123...",
    "name": "Data Structures",
    "code": "CS101",
    "description": "Intro to DS",
    "avgRating": 4.3
  }
]
```

**GET /api/feedback/analytics/\:courseId**

```json
{
  "avgRating": 4.2,
  "totalFeedback": 12,
  "distribution": {
    "1": 1,
    "2": 0,
    "3": 2,
    "4": 5,
    "5": 4
  }
}
```

---

## 📸 Screenshots

<img width="1895" height="964" alt="image" src="https://github.com/user-attachments/assets/d8438b7c-9f70-47cf-9da4-8c1deba2613b" />
<img width="1905" height="969" alt="image" src="https://github.com/user-attachments/assets/5ae87b49-0767-4c35-ae3d-7ecc626faff8" />
<img width="1896" height="907" alt="image" src="https://github.com/user-attachments/assets/7406bf2f-c801-4419-9822-f4b874f0e478" />

---

✨ This system makes it **easy for students to give feedback** and for admins to **track course performance with insights**.

