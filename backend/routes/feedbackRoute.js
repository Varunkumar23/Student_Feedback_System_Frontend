import express from "express";
import {
  addFeedback,
  getFeedbackByCourse,
  getFeedbackAnalytics
} from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/", addFeedback); 
router.get("/:courseId", getFeedbackByCourse); 
router.get("/analytics/:courseId", getFeedbackAnalytics); 

export default router;
