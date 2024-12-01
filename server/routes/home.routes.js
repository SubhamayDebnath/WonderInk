import { Router } from "express";
import {
  homePage,
  blogsPage,
  categoriesPage,
  aboutPage,
  blogPage,
  errorPage,
  addLink,
  categoryBasedPost
} from "../controllers/main.controller.js";
import {isAuthenticated} from '../middleware/auth.middleware.js'

const router = Router();

router.get("/", isAuthenticated,homePage);
router.get("/blogs", isAuthenticated, blogsPage);
router.get("/categories", isAuthenticated, categoriesPage);
router.get("/about", isAuthenticated, aboutPage);
router.get('/blog/:slug', isAuthenticated,blogPage);
router.get('/error', isAuthenticated, errorPage);
router.get('/category/:slug',isAuthenticated,categoryBasedPost)

router.post('/post/like/:id',isAuthenticated,addLink);

export default router;
