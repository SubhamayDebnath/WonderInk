import { Router } from "express";
import {
  registerPage,
  loginPage,
  register,
  login,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/register",isLoggedIn, registerPage);
router.get("/login",isLoggedIn, loginPage);

router.post("/api/v1/register",isLoggedIn, register);
router.post("/api/v1/login",isLoggedIn, login);

export default router;
