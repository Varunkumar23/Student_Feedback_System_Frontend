import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  fullName: { type: String, required: true },      
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },                      
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
