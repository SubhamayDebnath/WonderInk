import express from "express";
import {
  dashboard,
  getAllUsers,
  categoryPage,
  addCategoryPage,
  addCategory,
  postPage,
  addPostPage,
  addPost,
} from "../controllers/admin.controller.js";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/dashboard/users", getAllUsers);
router.get("/dashboard/categories", categoryPage);
router.get("/dashboard/posts", postPage);

router.get("/dashboard/add/category", addCategoryPage);
router.post("/api/v23/add/category", addCategory);

router.get("/dashboard/add/post", addPostPage);
router.post("/api/v23/add/post",upload.single('avatar'), addPost);

export default router;
