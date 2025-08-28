import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import FeedbackModal from './components/FeedbackModal'
import AdminPage from './admin/AdminPage'
import './style.css'

function App() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [submittedFeedback, setSubmittedFeedback] = useState(null)

  const openFeedbackModal = () => {
    setIsFeedbackModalOpen(true)
  }

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false)
  }

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await fetch('https://infinitelocus-backend-5r1w.onrender.com/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData)
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Feedback submitted successfully:', result)
        setSubmittedFeedback(feedbackData)
        closeFeedbackModal()
        setTimeout(() => { setSubmittedFeedback(null) }, 5000)
      } else {
        console.error('Failed to submit feedback')
        alert('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Error submitting feedback. Please try again.')
    }
  }

  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname === '/admin'

  if (isAdminRoute) {
    return (
      <div className="App admin-page">
        <Navbar onFeedbackClick={openFeedbackModal} />
        <AdminPage />
      </div>
    )
  }

  return (
    <div className="App">
      <Navbar onFeedbackClick={openFeedbackModal} />
      <Home onFeedbackClick={openFeedbackModal} />
      
      {submittedFeedback && (
        <div className="feedback-success-overlay">
          <div className="feedback-success">
            <h3>✅ Feedback Submitted Successfully!</h3>
            <div className="feedback-details">
              <p><strong>Course ID:</strong> {submittedFeedback.courseId}</p>
              <p><strong>Your Name:</strong> {submittedFeedback.fullName}</p>
              <p><strong>Rating:</strong> {submittedFeedback.rating}/5</p>
              <p><strong>Comment:</strong> {submittedFeedback.comment}</p>
            </div>
          </div>
        </div>
      )}
      
      {isFeedbackModalOpen && (
        <FeedbackModal 
          isOpen={isFeedbackModalOpen}
          onClose={closeFeedbackModal}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </div>
  )
}

export default App
