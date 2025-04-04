import { Request, Response } from "express";
import prisma from "../../config/db";

/**
 * @route   PATCH /api/quiz/attempt/:attemptId
 * @desc    Update quiz attempt score when the quiz is completed
 * @access  Public
 */

export const updateQuizAttemptScore = async (req: Request, res: Response) => {
    try {
        const { attemptId } = req.params;
        const { score } = req.body;

        if (!attemptId || score === undefined) {
            return res.status(400).json({ message: "Attempt ID and score are required." });
        }

        const attempt = await prisma.quizAttempt.update({
            where: { id: attemptId },
            data: { score },
        });

        return res.status(200).json({ message: "Quiz attempt updated.", attempt });
    } catch (error) {
        console.error("Error updating quiz attempt:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};