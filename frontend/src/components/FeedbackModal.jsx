import React, { useState, useEffect } from 'react'
import './FeedbackModal.css'

// ✅ Use deployed backend API
const API_BASE = 'https://infinitelocus-backend-5r1w.onrender.com/api'

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedbackData, setFeedbackData] = useState({
    courseId: '',
    rating: 0,
    comment: '',
    fullName: ''
  })

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      fetchCourses()
    }
  }, [isOpen])

  const fetchCourses = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/courses`)
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
      } else {
        console.error('Failed to fetch courses')
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFeedbackData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRatingChange = (rating) => {
    setFeedbackData(prev => ({
      ...prev,
      rating: rating
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (feedbackData.rating === 0) {
      alert('Please select a rating')
      return
    }
    if (!feedbackData.courseId) {
      alert('Please select a course')
      return
    }

    const completeFeedbackData = {
      courseId: feedbackData.courseId,
      fullName: feedbackData.fullName,
      rating: feedbackData.rating,
      comment: feedbackData.comment
    }

    onSubmit(completeFeedbackData)
    setFeedbackData({
      courseId: '',
      rating: 0,
      comment: '',
      fullName: ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Submit Feedback</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="courseId">Course:</label>
            <select
              id="courseId"
              name="courseId"
              value={feedbackData.courseId}
              onChange={handleInputChange}
              required
              className="course-dropdown"
            >
              <option value="">Select a course</option>
              {loading ? (
                <option value="" disabled>Loading courses...</option>
              ) : (
                courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name} ({course.code})
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Your Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={feedbackData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star ${star <= feedbackData.rating ? 'filled' : ''}`}
                  onClick={() => handleRatingChange(star)}
                >
                  ★
                </button>
              ))}
            </div>
            <span className="rating-text">
              {feedbackData.rating > 0 ? `${feedbackData.rating} out of 5` : 'Select rating'}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea
              id="comment"
              name="comment"
              value={feedbackData.comment}
              onChange={handleInputChange}
              rows="4"
              placeholder="Share your thoughts about the course..."
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackModal
