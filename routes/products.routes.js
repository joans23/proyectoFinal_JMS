import { Router } from "express";
import { ProductsController } from "../controllers/products.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.moddleware.js";


const router = Router();

router.get('/api/products',authMiddleware, ProductsController.getAll);
router.get('/api/products/:id', authMiddleware, ProductsController.getById);
router.post('/api/products/create', authMiddleware,requireRole('admin'), ProductsController.create);
router.put('/api/products/:id',authMiddleware,requireRole('admin'), ProductsController.update);
router.delete('/api/products/:id', authMiddleware, requireRole('admin'), ProductsController.remove);


export default router;