import { Router } from "express";
import { registerPage ,loginPage ,register} from "../controllers/auth.controller.js";

const router = Router();

router.get("/register", registerPage);
router.get("/login",loginPage)

router.post('/api/v1/register',register)

export default router;
