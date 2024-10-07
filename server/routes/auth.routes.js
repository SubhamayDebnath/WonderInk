import express from "express";
import { registerPage, loginPage, register,login} from "../controllers/auth.controller.js";
const router = express.Router();

router.get("/auth/register", registerPage);
router.get("/auth/login", loginPage);
router.post("/api/v23/register",register);
router.post("/api/v23/login",login);

export default router;
