import { Request, Response } from "express";
import prisma from "../../config/db";

// Define subcategories for each category
const subcategoryMap: Record<string, string[]> = {
  science: ["Physics", "Biology", "Chemistry", "Astronomy"],
  mathematics: ["General", "Algebra", "Geometry", "Calculus", "Statistics"],
  history: ["Ancient", "Modern", "World", "American"],
  technology: ["AI", "Cybersecurity", "Web Development", "Data Science"],
};

export const getSubCategories = async (req: Request, res: Response): Promise<any> => {
  const category = req.query.category;

  if (!category || typeof category !== "string") {
    return res.status(400).json({ error: "Category is required and must be a string" });
  }

  const subcategories = subcategoryMap[category.toLowerCase()] || [];

  return res.json({ subcategories });
};
