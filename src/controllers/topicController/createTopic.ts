import { Request, Response } from "express";
import prisma from "../../config/db";

export const createTopic = async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, categoryId } = req.body;

    // Validate required fields
    if (!name || !categoryId) {
      return res.status(400).json({ message: "Name and categoryId are required" });
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found. Please provide a valid categoryId." });
    }

    // Create the topic
    const topic = await prisma.topic.create({
      data: {
        name,
        categoryId,
      },
    });

    return res.status(201).json(topic);
  } catch (error) {
    console.error("Error creating topic:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
