import React, { useState, useEffect } from 'react'
import './Home.css'

// ✅ Use hosted backend API
const API_BASE = 'https://student-feedback-system-backend-dr6i.onrender.com/api'

const Home = ({ onFeedbackClick }) => {
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [courseAnalytics, setCourseAnalytics] = useState(null)
  const [recentComments, setRecentComments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${API_BASE}/courses`)
      if (response.ok) {
        const data = await response.json()
        setCourses(data)
        setLoading(false)
      } else {
        console.error('Failed to fetch courses')
        setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
      setLoading(false)
    }
  }

  const handleCourseSelect = async (course) => {
    setSelectedCourse(course)
    try {
      const analyticsResponse = await fetch(`${API_BASE}/courses/${course._id}`)
      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json()
        setCourseAnalytics(analyticsData)
      } else {
        console.error('Failed to fetch course analytics')
      }

      const commentsResponse = await fetch(`${API_BASE}/feedback/${course._id}`)
      if (commentsResponse.ok) {
        const commentsData = await commentsResponse.json()
        const topComments = commentsData
          .filter(feedback => feedback.comment && feedback.comment.trim() !== '')
          .slice(0, 5)
          .map(feedback => feedback.comment)
        setRecentComments(topComments)
      } else {
        console.error('Failed to fetch course comments')
        setRecentComments([])
      }
    } catch (error) {
      console.error('Error fetching course data:', error)
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="star filled">★</span>)
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="star half-filled">★</span>)
      } else {
        stars.push(<span key={i} className="star">★</span>)
      }
    }
    return stars
  }

  const renderPieChart = (distribution) => {
    if (!distribution) return null

    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0)
    if (total === 0) {
      return (
        <div className="pie-chart-no-data">
          <div className="no-data-circle">
            <span>No feedback yet</span>
          </div>
          <p className="no-data-text">This course doesn't have any ratings yet</p>
        </div>
      )
    }

    const colors = ['#4A90E2', '#FF6B6B', '#FFD93D', '#6BCF7F', '#A78BFA']
    let currentAngle = 0

    return (
      <div className="pie-chart">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {Object.entries(distribution).map(([rating, count], index) => {
            if (count === 0) return null
            
            const percentage = (count / total) * 100
            const angle = (percentage / 100) * 360
            const largeArcFlag = angle > 180 ? 1 : 0
            
            const x1 = 100 + 80 * Math.cos(currentAngle * Math.PI / 180)
            const y1 = 100 + 80 * Math.sin(currentAngle * Math.PI / 180)
            
            currentAngle += angle
            
            const x2 = 100 + 80 * Math.cos(currentAngle * Math.PI / 180)
            const y2 = 100 + 80 * Math.sin(currentAngle * Math.PI / 180)
            
            return (
              <path
                key={rating}
                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={colors[index % colors.length]}
                stroke="#fff"
                strokeWidth="3"
              />
            )
          })}
        </svg>
        <div className="pie-chart-legend">
          {Object.entries(distribution).map(([rating, count], index) => (
            <div key={rating} className="legend-item">
              <span className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></span>
              <span className="legend-text">{rating} stars: {count}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Loading courses...</div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="course-list-section">
          <h2>Course List</h2>
          <div className="course-list">
            {courses.map((course) => (
              <div key={course._id} className="course-card">
                <div className="course-info">
                  <h3 className="course-title">{course.name}</h3>
                  <div className="course-rating">
                    <div className="stars">
                      {renderStars(course.avgRating)}
                    </div>
                    <span className="rating-number">{course.avgRating.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  className="view-details-btn"
                  onClick={() => handleCourseSelect(course)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="course-details-section">
          {selectedCourse && courseAnalytics ? (
            <>
              <div className="analytics-section">
                <h3>Analytics</h3>
                
                <div className="overall-rating">
                  <div className="rating-display">
                    <span className="big-star">★</span>
                    <span className="rating-value">{courseAnalytics.analytics.avgRating.toFixed(1)}</span>
                  </div>
                  <p className="total-reviews">Total Reviews: {courseAnalytics.analytics.totalFeedback}</p>
                </div>
                <div className="pie-chart-section">
                  <h4>Rating Distribution (Pie Chart)</h4>
                  {renderPieChart(courseAnalytics.analytics.distribution)}
                </div>
                
                <div className="rating-distribution">
                  <h4>Rating Distribution</h4>
                  <div className="distribution-bars">
                    {[1, 2, 3, 4, 5].map((rating) => {
                      const count = courseAnalytics.analytics.distribution[rating] || 0
                      const percentage = courseAnalytics.analytics.totalFeedback > 0 
                        ? (count / courseAnalytics.analytics.totalFeedback) * 100 
                        : 0
                      return (
                        <div key={rating} className="distribution-bar">
                          <span className="bar-label">{rating}</span>
                          <div className="bar-container">
                            <div 
                              className="bar" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="bar-count">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="recent-comments-section">
                <h3>Recent Comments</h3>
                {recentComments.length > 0 ? (
                  <ul className="comments-list">
                    {recentComments.map((comment, index) => (
                      <li key={index}>{comment}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-comments">No comments yet for this course.</p>
                )}
              </div>
            </>
          ) : (
            <div className="no-course-selected">
              <h3>Course Details</h3>
              <p>Select a course from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
