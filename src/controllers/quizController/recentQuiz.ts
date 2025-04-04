import { Request, Response } from "express";
import prisma from "../../config/db";

export const recentQuiz = async (req: Request, res: Response): Promise<any> => {
    let userData = await (req as any)?.user
    if (!userData?.id) {
      return res.status(400).json({
          responseSuccessful: false,
          message: "User not authenticated",
          responseBody: null
      });
  }

    try {
        // Fetch recent quiz attempts by the user
        const recentQuizzes = await prisma.quizAttempt.findMany({
          where: { id: userData.id },
          orderBy: { createdAt: "desc" },
          take: 5, // Get the last 5 quizzes
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
            score: true,
            createdAt: true,
          },
        });
    
        // Format response
        const response = recentQuizzes.map((attempt) => ({
          title: attempt.quiz.title,
          topic: attempt.quiz.topic.name,
          category: attempt.quiz.topic.category.name,
          score: attempt.score,
          date: attempt.createdAt,
        }));

        console.log(response)
    
        res.json({ recentQuizzes: response });
      } catch (error) {
        console.error("Error fetching recent quizzes:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
};

