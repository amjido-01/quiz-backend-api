import { Request, Response } from "express";
import prisma from "../../config/db";

/**
 * @route   GET /api/leaderboard
 * @desc    Fetch the top players based on scores
 * @access  Public
 */
export const getLeaderboard = async (req: Request, res: Response) => {
    try {
        // Fetch top players based on highest scores
        const leaderboard = await prisma.quizAttempt.findMany({
            select: {
                user: { select: { id: true, name: true } }, // Get user info
                score: true,
                quiz: { select: { title: true } }, // Get quiz title
                createdAt: true,
            },
            orderBy: { score: "desc" }, // Sort by highest score
            take: 10 // Limit to top 10 players
        });

        return res.status(200).json({ success: true, leaderboard });
    } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
