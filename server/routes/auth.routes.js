import { Router } from "express";
import {
  registerPage,
  loginPage,
  register,
  login,
  logout,
  updatePassword
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/register",isLoggedIn, registerPage);
router.get("/login",isLoggedIn, loginPage);
router.get('/logout',logout)
router.post("/api/v1/register",isLoggedIn, register);
router.post("/api/v1/login",isLoggedIn, login);
router.put('/api/v1/password/update/:id',updatePassword)

export default router;
