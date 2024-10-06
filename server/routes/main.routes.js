import express from "express";
import { homepage } from "../controllers/main.controller.js";
const router = express.Router();

router.get("/", homepage);

export default router;
