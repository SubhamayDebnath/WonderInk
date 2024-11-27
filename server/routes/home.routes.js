import { Router } from "express";
import { homePage,blogsPage,categoriesPage } from "../controllers/main.controller.js";

const router = Router()

router.get("/",homePage);
router.get('/blogs',blogsPage);
router.get('/categories',categoriesPage)

export default router;