import express from "express";
import {
  dashboard,
  articlesPage,
  categoriesPage,
  usersPage,
  userPage,
  contactPage,
  postByUserPage,
  addPostPage,
  addCategoryPage,
  updateCategoryPage,
  updateUserPage,
  changePasswordPage,
  commentPage,
  doReplyPage,
  updatePostPage
} from "../controllers/admin.page.controller.js";
import {isAuthorized} from '../middlewares/auth.middleware.js'
const router = express.Router();
router.get("/",isAuthorized,dashboard);
router.get("/articles",isAuthorized,articlesPage);
router.get("/categories",isAuthorized,categoriesPage);
router.get("/users",isAuthorized,usersPage);
router.get("/me",isAuthorized,userPage)
router.get("/contact",isAuthorized,contactPage);
router.get("/me/article",isAuthorized,postByUserPage)
router.get("/comments",isAuthorized,commentPage);
router.get("/articles/add",isAuthorized,addPostPage)
router.get("/articles/update/:id",isAuthorized,updatePostPage)
router.get("/category/add",isAuthorized,addCategoryPage)
router.get("/category/update/:id",isAuthorized,updateCategoryPage)
router.get("/me/update/:id",isAuthorized,updateUserPage)
router.get("/me/change-password",isAuthorized,changePasswordPage)
router.get("/comment/:postID/reply/:commentID",isAuthorized,doReplyPage);
export default router;
