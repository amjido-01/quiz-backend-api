import { Request, Response } from "express";
import prisma from "../../config/db";

export const getTopicsByCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        const topics = await prisma.topic.findMany({
            where: {
                category: {
                    equals: String(category).toLowerCase(),
                    mode: "insensitive"
                }
            }
        });

        if (topics.length === 0) {
            return res.status(404).json({ message: "No topics found for this category" });
        }

        return res.status(200).json({ topics });
    } catch (error) {
        console.error("Error fetching topics:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
