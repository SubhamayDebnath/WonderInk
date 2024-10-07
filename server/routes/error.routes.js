import express from "express";
import {fourZeroFour,accountActivation} from "../controllers/error.controller.js";
const router = express.Router();

router.get("/activation", accountActivation);
router.get("*", fourZeroFour);


export default router;

