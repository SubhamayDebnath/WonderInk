import { Router } from "express";
import {
  homePage,
  blogsPage,
  categoriesPage,
  aboutPage,
} from "../controllers/main.controller.js";

const router = Router();

router.get("/", homePage);
router.get("/blogs", blogsPage);
router.get("/categories", categoriesPage);
router.get("/about", aboutPage);

export default router;
