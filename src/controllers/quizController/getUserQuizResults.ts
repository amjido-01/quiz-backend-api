import { Request, Response } from "express";
import prisma from "../../config/db";

/**
 * @route   GET /api/quiz/results/:userId
 * @desc    Fetch quiz results for a specific user
 * @access  Public
 */
export const getUserQuizResults = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        // Validate input
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        // Fetch the user's quiz attempts
        const quizResults = await prisma.quizAttempt.findMany({
            where: { userId },
            include: {
                quiz: true, // Include quiz details
                responses: {
                    include: { question: true } // Include user's responses with questions
                }
            },
            orderBy: { createdAt: "desc" } // Show latest first
        });

        return res.status(200).json({ success: true, quizResults });
    } catch (error) {
        console.error("Error fetching user quiz results:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
