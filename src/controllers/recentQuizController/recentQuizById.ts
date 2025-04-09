import { Request, Response } from "express";
import prisma from "../../config/db";

export const recentQuizById = async (req: Request, res: Response): Promise<any> => {
  const userData = (req as any)?.user;
  const { id } = req.params;


  if (!userData?.id) {
    return res.status(400).json({
      responseSuccessful: false,
      message: "User not authenticated",
      responseBody: null,
    });
  }

  if (!id) {
    return res.status(400).json({
      responseSuccessful: false,
      message: "Quiz Attempt ID is required",
      responseBody: null,
    });
  }

  try {
    const attempt = await prisma.quizAttempt.findFirst({
      where: {
        id,
        userId: userData.id, // Ensures user owns this attempt
      },
      select: {
        id: true,
        score: true,
        createdAt: true,
        quiz: {
          select: {
            title: true,
            topic: {
              select: {
                name: true,
                category: {
                  select: { name: true },
                },
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      return res.status(404).json({
        responseSuccessful: false,
        message: "Quiz attempt not found.",
        responseBody: null,
      });
    }

    const response = {
      id: attempt.id,
      title: attempt.quiz.title,
      topic: attempt.quiz.topic.name,
      category: attempt.quiz.topic.category.name,
      score: attempt.score,
      date: attempt.createdAt,
    };

    res.json({ recentQuiz: response });
  } catch (error) {
    console.error("Error fetching recent quiz by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
