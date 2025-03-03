import { Request, Response } from "express";
import prisma from "../../config/db";

export const getAllQuizzes = async (req: Request, res: Response): Promise<any> => {
    try {
      const { category, difficulty } = req.query;


       // Validate category if provided
       const allowedCategories = ["math", "science", "history", "General Knowledge Quiz"]; // Add more categories if needed
       if (category && !allowedCategories.includes(String(category).toLowerCase())) {
           return res.status(400).json({ message: "Invalid category provided" });
       }

       // Validate difficulty if provided
       const allowedDifficulties = ["easy", "medium", "hard"];
       if (difficulty && !allowedDifficulties.includes(String(difficulty).toLowerCase())) {
           return res.status(400).json({ message: "Invalid difficulty provided" });
       }

  
      const quizzes = await prisma.quiz.findMany({
        where: {
          category: {
            equals: category ? String(category).toLowerCase() : undefined,
            mode: "insensitive"
          },
          difficulty: {
            equals: difficulty ? String(difficulty).toLowerCase() : undefined,
            mode: "insensitive",
          },
        },
        include: {
          questions: true, // Include related questions
        },
      });
  
      if (quizzes.length === 0) {
        return res.status(404).json({ message: "No quizzes found......" });
      }
  
      return res.status(200).json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };