# Student Feedback System

A full-stack student feedback system that allows students to provide feedback on courses. The system consists of a React-based frontend and an Express-based backend, providing a seamless experience for users.

## Features

### Frontend
- **Modern Navbar**: Clean, responsive navbar with university logo and submit feedback button.
- **Feedback Modal**: Interactive feedback form with star rating system.
- **Responsive Design**: Mobile-friendly interface.
- **Backend Ready**: Prepared for easy backend integration.

### Backend
- **Course Management**: Create, read, update, and delete courses.
- **Feedback Management**: Submit feedback, retrieve feedback by course, and analyze feedback data.
- **Analytics**: Provides average ratings and feedback distribution.

## Setup Instructions

### Frontend
1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

### Backend
1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Start Server**
   ```bash
   npm run dev
   ```

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
└── public/
```

### Backend
```
backend/
├── models/
│   ├── Course.js
│   └── Feedback.js
├── routes/
│   ├── courseRoute.js
│   └── feedbackRoute.js
├── controllers/
│   ├── courseController.js
│   └── feedbackController.js
└── config/
    └── db.js
```

## Backend Integration

The feedback form is ready for backend integration. In the `handleFeedbackSubmit` function in `App.jsx`, you can:

1. Replace the console.log with your API call.
2. Send data to your backend endpoint.
3. Handle success/error responses.

Example API integration:
```javascript
const handleFeedbackSubmit = async (feedbackData) => {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(feedbackData)
    });
    
    if (response.ok) {
      // Handle success
      closeFeedbackModal();
    } else {
      // Handle error
      console.error('Failed to submit feedback');
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
};
```

## Technologies Used
- React 18
- Vite
- Express
- MongoDB
- Mongoose
- CSS3 with modern features
- Responsive design principles

## Customization
- **Logo**: Replace the placeholder image in `Navbar.jsx` with your university logo.
- **Colors**: Update the color scheme in the CSS files.
- **Form Fields**: Modify the feedback form fields in `FeedbackModal.jsx`.
- **Styling**: Customize the appearance in the respective CSS files.
