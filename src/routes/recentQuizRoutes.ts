import { Router } from "express";
import { recentQuiz } from "../controllers/recentQuizController/recentQuiz";
import { recentQuizById } from "../controllers/recentQuizController/recentQuizById";
import { authenticateToken } from "../middleware/auth";

const router = Router();


router.get("/:id", authenticateToken, recentQuizById);
router.get("/", authenticateToken, recentQuiz);

export default router;
