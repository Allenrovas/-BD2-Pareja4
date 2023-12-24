import { Router } from "express";
import Upload from "../middlewares/file.js";
import { signInPassword, signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post("/sign/up", Upload.single('photo'), signUp);
router.post("/sign/in", signInPassword);

export default router;