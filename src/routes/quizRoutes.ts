import { Router } from "express";
import { createQuiz } from "../controllers/quizController/createQuiz";
import { getAllQuizzes } from "../controllers/quizController/getQuizzes";
import { getQuizById } from "../controllers/quizController/getQuizById";
import { getQuizCategories } from "../controllers/quizController/getQuizByCategories";
import { createCategory } from "../controllers/quizController/quizCategory";
import { getSubCategories } from "../controllers/quizController/getSubCategories";
import { recentQuiz } from "../controllers/quizController/recentQuiz";
import { recentQuizById } from "../controllers/quizController/recentQuizById";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.get("/categories", authenticateToken, getQuizCategories);
router.get("/subcategories", getSubCategories);

// ❗ More specific routes must come before dynamic ones like `/:id`
router.get("/recent/:id", authenticateToken, recentQuizById);
router.get("/recent", authenticateToken, recentQuiz);

router.get("/", getAllQuizzes);
router.get("/:id", getQuizById);

router.post("/", createQuiz);
router.post("/categories", createCategory);

export default router;
