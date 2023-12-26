import { Router } from "express";
import { addFriend, deleteFriend, getFriends, getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/get/:email", getUser);
router.post("/add/friend", addFriend);
router.get("/get/friends/:email", getFriends);
router.delete("/delete/friend", deleteFriend);

export default router;