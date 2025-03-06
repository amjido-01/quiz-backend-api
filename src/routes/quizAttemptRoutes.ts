import { Router } from "express";
import { startQuizAttempt } from "../controllers/quizController/startQuizAttempt";

const router = Router();

// Route to start a quiz attempt
router.post("/attempt", startQuizAttempt);

export default router;
