import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { getIpInfo } from "../controllers/ipinfo.controller.js";

const router = Router();

router.get("/ipinfo", authMiddleware, getIpInfo);

export default router;
