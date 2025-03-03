import { Request, Response } from "express";
import prisma from "../../config/db";


/**
 * @route   GET /api/quizzes/:id
 * @desc    Get a single quiz by ID (including questions)
 * @access  Public
 */
export const getQuizById = async (req: Request, res: Response): Promise<any> => {
    try {
      const { id } = req.params;
  
      const quiz = await prisma.quiz.findUnique({
        where: { id },
        include: { questions: true }, // Fetch associated questions
      });
  
      if (!quiz) {
        return res.status(404).json({ message: "Quiz not found." });
      }
  
      return res.status(200).json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };