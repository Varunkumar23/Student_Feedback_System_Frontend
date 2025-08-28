import Course from "../models/Course.js";
import Feedback from "../models/Feedback.js";
import mongoose from "mongoose";


export const createCourse = async (req, res) => {
  try {
    const { name, code, description } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Course name and code are required" });
    }

    const existing = await Course.findOne({ code });
    if (existing) {
      return res.status(400).json({ message: "Course code already exists" });
    }

    const course = new Course({ name, code, description });
    await course.save();

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "feedbacks", 
          localField: "_id",
          foreignField: "course",
          as: "feedbacks"
        }
      },
      {
        $addFields: {
          avgRating: { $avg: "$feedbacks.rating" }
        }
      },
      {
        $project: {
          name: 1,
          code: 1,
          description: 1,
          avgRating: { $ifNull: ["$avgRating", 0] } 
        }
      }
    ]);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const stats = await Feedback.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$rating",
          count: { $sum: 1 }
        }
      }
    ]);

    const avg = await Feedback.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          total: { $sum: 1 }
        }
      }
    ]);

    const distribution = {};
    stats.forEach(s => {
      distribution[s._id] = s.count;
    });

    const feedbacks = await Feedback.find({ course: id })
      .select("fullName comment rating -_id");

    res.status(200).json({
      course,
      analytics: {
        avgRating: avg.length ? avg[0].avgRating : 0,
        totalFeedback: avg.length ? avg[0].total : 0,
        distribution
      },
      feedbacks
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;

    const updated = await Course.findByIdAndUpdate(
      id,
      { name, code, description },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Course not found" });

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
