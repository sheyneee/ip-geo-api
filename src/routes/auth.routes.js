import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { login, register, testUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/test-user", authMiddleware, testUser);

export default router;
