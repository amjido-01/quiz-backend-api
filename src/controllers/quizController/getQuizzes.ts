import { Request, Response } from "express";
import prisma from "../../config/db";

export const getAllQuizzes = async (req: Request, res: Response): Promise<any> => {
    try {
      const { category, difficulty } = req.query;
  
      const quizzes = await prisma.quiz.findMany({
        where: {
          category: category ? String(category) : undefined,
          difficulty: difficulty ? String(difficulty) : undefined,
        },
        include: {
          questions: true, // Include related questions
        },
      });
  
      if (quizzes.length === 0) {
        return res.status(404).json({ message: "No quizzes found." });
      }
  
      return res.status(200).json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };