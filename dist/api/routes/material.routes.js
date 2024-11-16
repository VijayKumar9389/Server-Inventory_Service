"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const material_controller_1 = require("../controllers/material.controller");
const router = (0, express_1.Router)();
router.post("/", material_controller_1.createMaterialController); // Adjusted
router.get("/", material_controller_1.getAllMaterialsController); // Adjusted
// router.get("/:id", getMaterialByIdController); // Uncommented and adjusted
router.put("/:id", material_controller_1.updateMaterialController); // Adjusted
router.delete("/:id", material_controller_1.deleteMaterialController); // Adjusted
exports.default = router;
