import express from "express";
import { createTopic } from "../controllers/topicController/createTopic";

const router = express.Router();

router.post("/topics", createTopic); // POST /api/topics

export default router;
