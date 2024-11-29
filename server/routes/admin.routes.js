import { Router } from "express";
import { dashboard ,adminBlogsPage,adminCategoryPage,adminUsersPage,adminUpdateWebsitePage,adminProfilePage,adminSettingPage} from "../controllers/admin.controller.js";
import {isAuthorized} from '../middleware/auth.middleware.js'

const router = Router();

router.get("/dashboard", isAuthorized,dashboard);
router.get('/blog',isAuthorized,adminBlogsPage);
router.get('/category',isAuthorized,adminCategoryPage);
router.get('/users',isAuthorized,adminUsersPage)
router.get('/update',isAuthorized,adminUpdateWebsitePage);
router.get('/profile',isAuthorized,adminProfilePage);
router.get('/settings',isAuthorized,adminSettingPage)

export default router;