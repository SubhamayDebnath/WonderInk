import { Router } from "express";
import {
  homePage,
  blogsPage,
  categoriesPage,
  contactPage,
  blogPage,
  errorPage,
  addLink,
  categoryBasedPost,
  tagBasedPost
} from "../controllers/main.controller.js";
import {isAuthenticated} from '../middleware/auth.middleware.js'

const router = Router();

router.get("/", isAuthenticated,homePage);
router.get("/blogs", isAuthenticated, blogsPage);
router.get("/categories", isAuthenticated, categoriesPage);
router.get("/contact", isAuthenticated, contactPage);
router.get('/blog/:slug', isAuthenticated,blogPage);
router.get('/error', isAuthenticated, errorPage);
router.get('/category/:slug',isAuthenticated,categoryBasedPost)
router.get('/tag/:slug',isAuthenticated,tagBasedPost)

router.post('/post/like/:id',isAuthenticated,addLink);

export default router;
