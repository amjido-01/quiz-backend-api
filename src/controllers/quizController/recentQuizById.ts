import { Request, Response } from "express";
import prisma from "../../config/db";

export const recentQuizById = async (req: Request, res: Response): Promise<any> => {
    let userData = await (req as any)?.user

  if (!userData?.id) {
    return res.status(400).json({
      responseSuccessful: false,
      message: "User ID is required",
      responseBody: null,
    });
  }

  try {
    const recentQuizzes = await prisma.quizAttempt.findMany({
      where: { userId: userData?.id},
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
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
        id: true,
        score: true,
        createdAt: true,
      },
    });

    const response = recentQuizzes.map((attempt) => ({
      title: attempt.quiz.title,
      topic: attempt.quiz.topic.name,
      category: attempt.quiz.topic.category.name,
      score: attempt.score,
      date: attempt.createdAt,
    }));

    res.json({ recentQuizzes: response });
  } catch (error) {
    console.error("Error fetching recent quizzes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
