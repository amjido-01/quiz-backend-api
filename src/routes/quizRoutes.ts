import { Router } from "express";
import { createQuiz } from "../controllers/quizController/createQuiz";
import { getAllQuizzes } from "../controllers/quizController/getQuizzes";
import { getQuizById } from "../controllers/quizController/getQuizById";
import { getQuizCategories } from "../controllers/quizController/getQuizByCategories";
import { createCategory } from "../controllers/quizController/quizCategory";
import { getSubCategories } from "../controllers/quizController/getSubCategories";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/categories", authenticateToken, getQuizCategories);
router.get("/subcategories", authenticateToken, getSubCategories);

router.get("/", authenticateToken, getAllQuizzes);
router.get("/:id", authenticateToken, getQuizById);

router.post("/", authenticateToken, createQuiz);
router.post("/categories", authenticateToken, createCategory);

export default router;
