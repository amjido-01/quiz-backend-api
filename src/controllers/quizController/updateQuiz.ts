import { Request, Response } from "express";
import prisma from "../../config/db";


/**
 * @route   PUT /api/quiz/:id
 * @desc    Update an existing quiz (title, category, difficulty, and questions)
 * @access  Private (Requires Authentication)
 */
export const updateQuiz = async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const { title, category, difficulty, questions } = req.body;
  
    try {
      // Check if the quiz exists
      const existingQuiz = await prisma.quiz.findUnique({
        where: { id },
      });
  
      if (!existingQuiz) {
        return res.status(404).json({ message: "Quiz not found" });
      }
  
      // Update the quiz
      const updatedQuiz = await prisma.quiz.update({
        where: { id },
        data: {
          title: title || existingQuiz.title,
          category: category || existingQuiz.category,
          difficulty: difficulty || existingQuiz.difficulty,
        },
      });
  
      // If questions are provided, update them
      if (questions && Array.isArray(questions)) {
        // Delete old questions
        await prisma.question.deleteMany({
          where: { quizId: id },
        });
  
        // Insert new questions
        await prisma.question.createMany({
          data: questions.map((q: any) => ({
            quizId: id,
            text: q.text,
            type: q.type,
            options: q.options,
            correctAnswer: q.correctAnswer,
          })),
        });
      }
  
      return res.status(200).json({
        message: "Quiz updated successfully",
        quiz: updatedQuiz,
      });
    } catch (error) {
      console.error("Error updating quiz:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };