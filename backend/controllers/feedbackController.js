import Feedback from "../models/Feedback.js";
import Course from "../models/Course.js";
import mongoose from "mongoose";


export const addFeedback = async (req, res) => {
  try {
    const { courseId, fullName, rating, comment } = req.body;

    if (!courseId || !fullName || !rating) {
      return res.status(400).json({ message: "Course ID, full name and rating are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const feedback = new Feedback({
      course: courseId,
      fullName,
      rating,
      comment
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFeedbackByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const feedbacks = await Feedback.find({ course: courseId }).sort({ createdAt: -1 });

    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFeedbackAnalytics = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const avg = await Feedback.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          total: { $sum: 1 }
        }
      }
    ]);

    const stats = await Feedback.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      }
    ]);

    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats.forEach(s => {
      distribution[s._id] = s.count;
    });

    res.status(200).json({
      avgRating: avg.length ? avg[0].avgRating : 0,
      totalFeedback: avg.length ? avg[0].total : 0,
      distribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
