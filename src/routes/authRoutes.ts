import { Router } from "express";
import { login } from "../controllers/authController/login";
import { register } from "../controllers/authController/register";
import { refreshToken } from "../controllers/authController/refresh-token";



const router = Router();


router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshToken)


export default router;