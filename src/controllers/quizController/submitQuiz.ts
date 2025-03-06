import { Request, Response } from "express";
import prisma from "../../config/db";

/**
 * @route   POST /api/quiz/submit
 * @desc    Submit an answer for a quiz question, update score, and track progress
 * @access  Public
 */

export const submitQuizAnswer = async (req: Request, res: Response) => {
    try {
        const { attemptId, questionId, answer } = req.body;

        // Validate input
        if (!attemptId || !questionId || !answer) {
            return res.status(400).json({ message: "Attempt ID, question ID, and answer are required." });
        }

        // Fetch the quiz attempt and associated questions
        const attempt = await prisma.quizAttempt.findUnique({
            where: { id: attemptId },
            include: { quiz: { include: { questions: true } } },
        });

        if (!attempt) {
            return res.status(404).json({ message: "Quiz attempt not found." });
        }

        // Find the current question in the quiz
        const question = attempt.quiz.questions.find((q) => q.id === questionId);
        if (!question) {
            return res.status(400).json({ message: "Invalid question ID." });
        }

        // Check if the answer is correct
        const isCorrect = answer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

        // Update score if correct
        let updatedScore = attempt.score;
        if (isCorrect) {
            updatedScore++;
            await prisma.quizAttempt.update({
                where: { id: attemptId },
                data: { score: updatedScore },
            });
        }

        // Determine remaining questions
        const answeredQuestions = await prisma.userResponse.count({ where: { attemptId } });
        const totalQuestions = attempt.quiz.questions.length;
        const remainingQuestions = totalQuestions - answeredQuestions - 1;

        // Save the user's answer in a separate table for tracking
        await prisma.userResponse.create({
            data: {
                attemptId,
                questionId,
                selectedAnswer: answer,
                isCorrect,
            },
        });

        // Check if quiz is complete
        const isQuizCompleted = remainingQuestions <= 0;

        return res.status(200).json({
            message: "Answer submitted successfully.",
            isCorrect,
            updatedScore,
            remainingQuestions,
            isQuizCompleted,
        });

    } catch (error) {
        console.error("Error submitting quiz answer:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
