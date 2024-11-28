import { Router } from "express";
import { dashboard ,adminBlogsPage} from "../controllers/admin.controller.js";

const router = Router();

router.get("/dashboard", dashboard);
router.get('/blog',adminBlogsPage)

export default router;