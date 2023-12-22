import { Router } from "express";
import { signInPassword, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign/up", signUp);
router.post("/sign/in", signInPassword);

export default router;