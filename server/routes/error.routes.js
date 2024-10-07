import express from "express";
import {fourZeroFour,accountActivation} from "../controllers/error.controller.js";
const router = express.Router();

router.get("*", fourZeroFour);
router.get("/account/activation", accountActivation);

export default router;

