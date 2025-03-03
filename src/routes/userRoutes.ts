import { Router } from "express";
import { profile } from "../controllers/userController/profile";
import { authenticateToken } from "../middleware/auth";

const router = Router();


router.get("/profile", authenticateToken, profile)

export default router;