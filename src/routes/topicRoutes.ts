import express from "express";
import { createTopic } from "../controllers/topicController/createTopic";
import { getTopicsByCategory } from "../controllers/topicController/getTopicsByCategory";

const router = express.Router();

router.post("/topics", createTopic); // POST /api/topics
router.get("/topics", getTopicsByCategory)

export default router;
