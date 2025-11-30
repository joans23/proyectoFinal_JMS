import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers.js";

const router = Router();

router.post('/auth/login', AuthController.login);
router.post('/auth/register',AuthController.register);

export default router;