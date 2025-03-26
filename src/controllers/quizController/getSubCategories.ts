import { Request, Response } from "express";
import prisma from "../../config/db";
import { equal } from "assert";

export const getSubCategories = async (req: Request, res: Response): Promise<any> => {
  try {
    const { category } = req.query;

    if (!category || typeof category !== "string") {
      return res.status(400).json({ error: "Category is required and must be a string" });
    }

    // Find the category by name
    const categoryData = await prisma.category.findFirst({
      where: { 
        name: { equals: category, mode: "insensitive" } 
      },
      include: { topics: true }, // Fetch associated topics (subcategories)
    });
    

    if (!categoryData) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Extract topic names as subcategories
    const subcategories = categoryData.topics.map((topic) => topic.name);

    return res.json({ subcategories });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
