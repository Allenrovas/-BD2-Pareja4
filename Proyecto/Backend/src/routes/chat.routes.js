import { Router } from "express";
import { createChat, getMessages} from "../controllers/chat.controller.js";

const router = Router();

router.post("/create", createChat);
router.get("/getMessages/:email/:friendEmail", getMessages);

export default router;