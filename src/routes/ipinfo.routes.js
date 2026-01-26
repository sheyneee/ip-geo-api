// routes/ipinfo.routes.js
import { Router } from "express";
import { getIpInfo } from "../controllers/ipinfo.controller.js";

const router = Router();

router.get("/ipinfo", getIpInfo);

export default router;
