import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { startQuizAttempt } from "../controllers/quizAttemptController/startQuizAttempt";

const router = Router();

// Route to start a quiz attempt
router.post("/attempt", authenticateToken, startQuizAttempt);

export default router;
