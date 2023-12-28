import { Router } from "express";
import { addFriend, deleteFriend, getFriends, getFriendsBySpecialty, getFriendsInCommon, getUser, updateProfile, uploadPdf, getFiles, getNoFriends} from "../controllers/user.controller.js";
import Upload from "../middlewares/file.js";

const router = Router();

router.get("/get/files/:email", getFiles);
router.post("/upload/pdf/:email", Upload.single('pdf'), uploadPdf);
router.patch("/update/:email", updateProfile);
router.get("/get/:email", getUser);
router.post("/add/friend", addFriend);
router.get("/get/friends/:email", getFriends);
router.delete("/delete/friend", deleteFriend);
router.get("/get/friends/common/:email", getFriendsInCommon);
router.get("/get/suggest/friends/specialty/:email", getFriendsBySpecialty);
router.get("/get/noFriends/:email", getNoFriends);



export default router;