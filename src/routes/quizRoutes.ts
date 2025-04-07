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
router.get("/subcategories", getSubCategories);

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);

router.post("/", createQuiz);
router.post("/categories", createCategory);

export default router;
