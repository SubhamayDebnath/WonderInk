import { Router } from "express";
import {
  homePage,
  blogsPage,
  categoriesPage,
  aboutPage,
  blogPage,
  errorPage
} from "../controllers/main.controller.js";

const router = Router();

router.get("/", homePage);
router.get("/blogs", blogsPage);
router.get("/categories", categoriesPage);
router.get("/about", aboutPage);
router.get('/blog/:slug',blogPage);
router.get('/error',errorPage)

export default router;
