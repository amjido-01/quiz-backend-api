import { Request, Response } from "express";
import prisma from "../../config/db";


// user profile
export const profile = async (req: Request, res: Response): Promise<any> => {
    let userData = await (req as any)?.user
    if (!userData?.id) {
      return res.status(400).json({
          responseSuccessful: false,
          message: "User not authenticated",
          responseBody: null
      });
  }
    try {
        const user = await prisma.user.findUnique({
            where: {id: userData.id},
            // include: {
            //     expenses: true,
            //     income: true,
            //     workspaces: true
            // }
        })
        if (!user) {
            return res.status(404).json({ message: 'User not found ,,,,,,' });
          }
      
          res.json({user, message: "This is a protected route"});
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' });
  
    }
}