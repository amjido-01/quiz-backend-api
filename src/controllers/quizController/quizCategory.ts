import { Request, Response } from "express";
import prisma from "../../config/db";

export const createCategory = async (req: Request, res: Response): Promise<any> => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Category name is required" });
    }
  
    try {
      const existingCategory = await prisma.category.findUnique({
        where: { name },
      });
  
      if (existingCategory) {
        return res.status(400).json({ error: "Category already exists" });
      }
  
      const category = await prisma.category.create({
        data: { name },
      });
  
      res.status(201).json(category);
    } catch (error: unknown) {
      console.error(error); // Log error for debugging
      res.status(500).json({ error: "Failed to create category", details: error });
    }
};
