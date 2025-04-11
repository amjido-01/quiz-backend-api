import express from "express";
import { createTopic } from "../controllers/topicController/createTopic";
import { getTopicsByCategory } from "../controllers/topicController/getTopicsByCategory";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/topics", authenticateToken, createTopic); // POST /api/topics
router.get("/topics", authenticateToken, getTopicsByCategory)

export default router;
