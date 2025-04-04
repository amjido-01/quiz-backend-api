import { Response, Request } from "express";
import bcrypt from "bcrypt"
import prisma from "../../config/db";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwtUtils";

export const register = async (req: Request, res: Response): Promise<any> => {
    const {username, email, password} = req.body;
    console.log(username)
    try {

        if (!username || !email || !password) return res.status(400).json({message: "please provide all inputs, oo"})

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) {
            return res.status(404).json({
                responseSuccessful: true,
                responseMessage: "This email has been registered already",
                responseBody: null
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

         // Generate tokens
         const accessToken = generateAccessToken({
            id: user.id,
            email: user.email
        });

        const refreshToken = generateRefreshToken({
            id: user.id,
            email: user.email
        })

        
      // Save refreshToken in the database
        const updatedUser = await prisma.user.update({
            where: { id: user.id }, // Use the user's ID to update the record
            data: { refreshToken }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
          //   secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

        res.status(201).json({ 
            responseSuccessful: true,
            responseMessage: 'User created successfully',
            responseBody: {
                user: {
                    id: updatedUser.id,
                    username: updatedUser.username,
                    email: updatedUser.email,
                  },
                accessToken,
                refreshToken
            }
        });

    } catch (error) {
        res.status(500).json({
            responseSuccessful: false,
            responseMessage: error,
            responseBody: null
        });
    }
}