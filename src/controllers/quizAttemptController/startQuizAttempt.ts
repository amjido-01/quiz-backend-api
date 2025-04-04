import { Request, Response } from "express";
import prisma from "../../config/db";

/**
 * @route   POST /api/quiz/attempt
 * @desc    Create a quiz attempt when the user starts a quiz
 * @access  Public
 */

export const startQuizAttempt = async (req: Request, res: Response): Promise<any> => {
    try {
        const { userId, quizId } = req.body;

        // Validate input
        if (!userId || !quizId) {
            return res.status(400).json({ message: "User ID and Quiz ID are required." });
        }

        // Check if quiz exists
        const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found." });
        }

        // Create a new quiz attempt
        const attempt = await prisma.quizAttempt.create({
            data: {
                userId,
                quizId,
                score: 0, // Initial score before submission
            },
        });

        return res.status(201).json({ message: "Quiz attempt started.", attempt });
    } catch (error) {
        console.error("Error starting quiz attempt:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}