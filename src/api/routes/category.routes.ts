import { Router } from "express";
import * as categoryController from "../controllers/category.controller";

const router = Router();

router.post('/', categoryController.createCategoryController);
router.get('/', categoryController.getAllCategoriesController);
router.get('/:id', categoryController.getCategoryByIdController);
router.put('/:id', categoryController.updateCategoryController);
router.delete('/:id', categoryController.deleteCategoryController);

export default router;