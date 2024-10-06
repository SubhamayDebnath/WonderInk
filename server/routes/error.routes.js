import express from "express";
import fourZeroFour from "../controllers/error.controller.js";
const router = express.Router();

router.get("*", fourZeroFour);

export default router;
