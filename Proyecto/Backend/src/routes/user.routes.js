import { Router } from "express";
import { addFriend, deleteFriend, getFriends, getFriendsBySpecialty, getFriendsInCommon, getUser } from "../controllers/user.controller.js";

const router = Router();

router.get("/get/:email", getUser);
router.post("/add/friend", addFriend);
router.get("/get/friends/:email", getFriends);
router.delete("/delete/friend", deleteFriend);
router.get("/get/friends/common/:email", getFriendsInCommon);
router.get("/get/suggest/friends/specialty/:email", getFriendsBySpecialty);

export default router;