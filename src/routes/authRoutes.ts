import { Router } from "express";
import { login } from "../controllers/authController/login";
import { register } from "../controllers/authController/register";
import { refreshToken } from "../controllers/authController/refresh-token";
import { logout } from "../controllers/authController/logout";


const router = Router();


router.post("/register", register)
router.post("/login", login)
router.post("/refresh-token", refreshToken)
router.post('/logout', logout)


export default router;