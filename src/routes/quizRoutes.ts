import { Router } from "express";
import { createQuiz } from "../controllers/quizController/createQuiz";
import { getAllQuizzes } from "../controllers/quizController/getQuizzes";
import { getQuizById } from "../controllers/quizController/getQuizById";



const router = Router();

router.get("/quizzes", getAllQuizzes); 
router.get("/quizzes/:id", getQuizById);
router.post("/quizzes", createQuiz); 

export default router;