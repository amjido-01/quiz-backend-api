import { Router } from "express";
import { profile } from "../controllers/userController/profile";
import { refreshToken } from "../controllers/authController/refresh-token";
import { authenticateToken } from "../middleware/auth";


const router = Router();

router.post("/refresh-token", refreshToken)
router.get("/profile", authenticateToken, profile)

export default router;