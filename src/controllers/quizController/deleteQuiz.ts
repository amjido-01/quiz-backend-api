import { Request, Response } from "express";
import prisma from "../../config/db";

/**
 * @route   DELETE /api/quiz/:id
 * @desc    Delete a quiz and its associated questions
 * @access  Private (Requires Authentication)
 */
export const deleteQuiz = async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;

  try {
    // Check if the quiz exists
    const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Delete associated questions first (if any)
    await prisma.question.deleteMany({
      where: { quizId: id },
    });

    // Delete the quiz
    await prisma.quiz.delete({
      where: { id },
    });

    return res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};