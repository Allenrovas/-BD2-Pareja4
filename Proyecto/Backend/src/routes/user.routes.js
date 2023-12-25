import { Router } from "express";
import { getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/get/:email", getUser);

export default router;