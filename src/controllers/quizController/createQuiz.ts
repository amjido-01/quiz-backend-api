import { Request, Response } from "express";
import prisma from "../../config/db";

export const createQuiz = async (req: Request, res: Response): Promise<any> => {
  try {
    const { title, topicId, difficulty, questions } = req.body;

    // Validate required fields
    if (!title || !topicId || !difficulty || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Missing required fields or invalid data format" });
    }

    // Validate difficulty level
    const allowedDifficulties = ["easy", "medium", "hard"];
    if (!allowedDifficulties.includes(difficulty.toLowerCase())) {
      return res.status(400).json({ message: "Invalid difficulty provided" });
    }

    // Create the quiz
    const quiz = await prisma.quiz.create({
      data: {
        title,
        difficulty: difficulty.toLowerCase(),
        topicId, // Ensure this topic exists in your database
        questions: {
          create: questions.map((q: { question: string; options: string[]; correctAnswer: string; type: string }) => ({
            text: q.question, // Match Prisma schema
            type: q.type, // Ensure type is provided
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
          
        },
      },
      include: { questions: true },
    });

    return res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
