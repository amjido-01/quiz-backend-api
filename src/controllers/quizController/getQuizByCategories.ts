import { Request, Response } from "express";
import prisma from "../../config/db";


/**
 * @route   GET /api/quizzes/categories
 * @desc    Get a quiz by categories (including questions)
 * @access  Public
 */
export const getQuizCategories = async (req: Request, res: Response): Promise<any> => {
    try {
        // ✅ Step 1: Fetch unique categories
        const categories = await prisma.quiz.findMany({
          select: { category: true },
          distinct: ["category"], // Get unique categories
        });
    
        // ✅ Step 2: Extract category names into an array
        const categoryList = categories.map((c) => c.category);
    
        res.status(200).json({ categories: categoryList });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
  };