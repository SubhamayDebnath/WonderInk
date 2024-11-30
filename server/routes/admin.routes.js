import { Router } from "express";
import { dashboard ,adminBlogsPage,adminCategoryPage,adminUsersPage,adminUpdateWebsitePage,adminProfilePage,adminSettingPage,addCategoryPage,addCategory,updateProfile} from "../controllers/admin.controller.js";
import {isAuthorized} from '../middleware/auth.middleware.js'

const router = Router();

router.get("/dashboard", isAuthorized,dashboard);
router.get('/blog',isAuthorized,adminBlogsPage);
router.get('/category',isAuthorized,adminCategoryPage);
router.get('/users',isAuthorized,adminUsersPage)
router.get('/update',isAuthorized,adminUpdateWebsitePage);
router.get('/profile',isAuthorized,adminProfilePage);
router.get('/settings',isAuthorized,adminSettingPage);
router.get('/category/add',isAuthorized,addCategoryPage);



router.post('/api/v1/category/add',isAuthorized,addCategory)
router.put('/api/v1/profile/update/:id',isAuthorized,updateProfile);

export default router;