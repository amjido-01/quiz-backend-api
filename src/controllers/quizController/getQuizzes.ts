import { Request, Response } from "express";
import prisma from "../../config/db";

export const getAllQuizzes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { category, subcategory, difficulty } = req.query;

    // Validate difficulty if provided
    const allowedDifficulties = ["easy", "medium", "hard"];
    if (difficulty && !allowedDifficulties.includes(String(difficulty).toLowerCase())) {
      return res.status(400).json({ message: "Invalid difficulty provided" });
    }

    // Fetch quizzes with filters applied
    const quizzes = await prisma.quiz.findMany({
      where: {
        topic: {
          category: {
            name: category ? String(category).toLowerCase() : undefined, // Filter by category name
          },
          name: subcategory ? String(subcategory).toLowerCase() : undefined, // Filter by topic (subcategory)
        },
        difficulty: difficulty ? String(difficulty).toLowerCase() : undefined,
      },
      include: {
        topic: { include: { category: true } }, // Include topic & category details
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
