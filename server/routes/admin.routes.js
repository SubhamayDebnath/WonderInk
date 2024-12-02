import { Router } from "express";
import {
  dashboard,
  adminBlogsPage,
  adminCategoryPage,
  adminUsersPage,
  adminProfilePage,
  adminSettingPage,
  addCategoryPage,
  editCategoryPage,
  updateCategory,
  disableCategory,
  addCategory,
  deleteCategory,
  updateProfile,
  updateSocialLinks,
  postSetting,
  sidebarSetting,
  dashboardSetting,
  addPostPage,
  addPost,
  addContactMessage,
  addNewsletter,
  contactPage,
  newsletterPage
} from "../controllers/admin.controller.js";
import { isAuthorized } from "../middleware/auth.middleware.js";
import upload from '../middleware/multer.middleware.js'

const router = Router();

router.get("/dashboard", isAuthorized, dashboard);
router.get("/blog", isAuthorized, adminBlogsPage);
router.get("/category", isAuthorized, adminCategoryPage);
router.get("/users", isAuthorized, adminUsersPage);
router.get("/profile", isAuthorized, adminProfilePage);
router.get("/settings", isAuthorized, adminSettingPage);
router.get('/contact',isAuthorized,contactPage)
router.get('/newsletter',isAuthorized,newsletterPage)
router.get("/category/add", isAuthorized, addCategoryPage);
router.get("/category/edit/:id", isAuthorized, editCategoryPage);
router.get("/post/add",isAuthorized,addPostPage);


router.post("/api/v1/category/add", isAuthorized, addCategory);
router.put('/api/v1/category/edit/:id',isAuthorized,updateCategory)
router.put('/api/v1/category/disable/:id',isAuthorized,disableCategory);
router.delete('/api/v1/category/delete/:id',isAuthorized,deleteCategory);

router.put("/api/v1/profile/update/:id", isAuthorized,upload.single("avatar"), updateProfile);
router.put('/api/v1/profile/social/update/:id',isAuthorized,updateSocialLinks);

router.put('/setting/post/update',isAuthorized,postSetting);
router.put('/setting/sidebar/update',isAuthorized,sidebarSetting);
router.put('/setting/dashboard/update',isAuthorized,dashboardSetting);

router.post('/api/v1/post/add',isAuthorized,upload.single("avatar"),addPost);

router.post('/contact/add',isAuthorized,addContactMessage);
router.post('/newsletter/add',isAuthorized,addNewsletter);

export default router;
