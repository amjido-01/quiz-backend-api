import { Router } from "express";
import { createQuiz } from "../controllers/quizController/createQuiz";
import { getAllQuizzes } from "../controllers/quizController/getQuizzes";
import { getQuizById } from "../controllers/quizController/getQuizById";
import { getQuizCategories } from "../controllers/quizController/getQuizByCategories";


const router = Router();

router.get("/categories", getQuizCategories);
router.get("/", getAllQuizzes); 
router.get("/:id", getQuizById);
router.post("/", createQuiz); 

export default router;