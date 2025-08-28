import React from 'react'
import './Navbar.css'

const Navbar = ({ onFeedbackClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="navbar-title">Student Feedback System</h1>
        </div>
        
        <div className="navbar-menu">
          <button 
            className="navbar-feedback-btn"
            onClick={onFeedbackClick}
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
