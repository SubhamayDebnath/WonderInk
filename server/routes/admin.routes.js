import express from "express";
import { dashboard,getAllUsers } from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/dashboard/users", getAllUsers);

export default router;
