import { Request, Response } from "express";
import prisma from "../../config/db";


/**
 * @route   POST /api/quizzes
 * @desc    Create a new quiz
 * @access  Private (Requires Authentication)
 * 
 * This function handles quiz creation by taking the required data from the request body,
 * validating it, storing it in the database, and returning the created quiz.
 */


export const createQuiz = async (req: Request, res: Response): Promise<any> => {
    try {
      const { title, category, difficulty, questions } = req.body;
  
      if (!title || !category || !difficulty || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ message: "Missing required fields or invalid format." });
      }
  
      // Step 1: Create the Quiz first
      const newQuiz = await prisma.quiz.create({
        data: {
          title,
          category,
          difficulty,
        },
      });
  
      // Step 2: Create Questions associated with the newly created Quiz
      const createdQuestions = await prisma.question.createMany({
        data: questions.map((q: any) => ({
          quizId: newQuiz.id, // Explicitly linking the question to the quiz
          text: q.text,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
        })),
      });
  
      return res.status(201).json({
        message: "Quiz created successfully!",
        quiz: newQuiz,
        questions: createdQuestions,
      });
  
    } catch (error) {
      console.error("Error creating quiz:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };