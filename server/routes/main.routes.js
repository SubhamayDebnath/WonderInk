import express from "express";
import { homePage, categoryPage, aboutPage, contactPage } from "../controllers/main.controller.js";
const router = express.Router();

router.get("/", homePage);
router.get('/categories',categoryPage);
router.get('/about',aboutPage);
router.get('/contact',contactPage);

export default router;
