import { Router } from "express";
import {getPublications,createPublication } from "../controllers/publication.controller.js";

const router = Router();

router.get("/getPublications/:email", getPublications);
router.post("/create", createPublication);


export default router;