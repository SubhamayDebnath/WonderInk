import { Router } from "express";
import { dashboard ,adminBlogsPage,adminCategoryPage,adminUsersPage,adminUpdateWebsitePage,adminProfilePage} from "../controllers/admin.controller.js";

const router = Router();

router.get("/dashboard", dashboard);
router.get('/blog',adminBlogsPage);
router.get('/category',adminCategoryPage);
router.get('/users',adminUsersPage)
router.get('/update',adminUpdateWebsitePage);
router.get('/profile',adminProfilePage)

export default router;