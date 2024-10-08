import express from "express";
import { dashboard,getAllUsers,categoryPage ,addCategoryPage} from "../controllers/admin.controller.js";
const router = express.Router();

router.get("/dashboard", dashboard);
router.get("/dashboard/users", getAllUsers);
router.get("/dashboard/categories", categoryPage);

router.get("/dashboard/add/category",addCategoryPage)

export default router;
