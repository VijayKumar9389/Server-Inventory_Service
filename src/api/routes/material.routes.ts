import { Router } from "express";
import {
    createMaterialController,
    getAllMaterialsController,
    getMaterialByIdController,
    updateMaterialController,
    deleteMaterialController,
    getMaterialsByCategoryController,
    createInventoryController,
    getInventoryByMaterialIdController, getInventoryByLocationIdController, deleteInventoryController
} from "../controllers/material.controller";
import upload from "../middleware/upload";

const router = Router();

router.post("/", upload.single('image'), createMaterialController); // Adjusted
router.post("/inventory", createInventoryController);
router.get("/inventory/:materialId", getInventoryByMaterialIdController);
router.get("/inventory/location/:locationId", getInventoryByLocationIdController);
router.delete("/inventory/:id", deleteInventoryController);
router.get("/", getAllMaterialsController); // Adjusted
router.get("/:id", getMaterialByIdController); // Uncommented and adjusted
router.put("/:id", upload.single('image'), updateMaterialController); // Adjusted
router.delete("/:id", deleteMaterialController); // Adjusted
router.get("/category/:categoryId", getMaterialsByCategoryController); // Uncommented and adjusted

export default router;