import { Router } from "express";
import { homePage,blogsPage } from "../controllers/main.controller.js";

const router = Router()

router.get("/",homePage);
router.get('/blogs',blogsPage)

export default router;