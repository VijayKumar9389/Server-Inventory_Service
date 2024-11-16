"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaterialController = exports.updateMaterialController = exports.getMaterialByIdController = exports.getAllMaterialsController = exports.createMaterialController = void 0;
const materials_service_1 = require("../services/materials.service");
// Controller for creating a new material
const createMaterialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const materialData = req.body;
    try {
        const newMaterial = yield (0, materials_service_1.createMaterial)(materialData);
        res.status(201).json(newMaterial);
    }
    catch (error) {
        res.status(500).json({ error: "Error creating material" });
    }
});
exports.createMaterialController = createMaterialController;
// Controller for fetching all materials
const getAllMaterialsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const materials = yield (0, materials_service_1.getAllMaterials)();
        res.status(200).json(materials);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching materials" });
    }
});
exports.getAllMaterialsController = getAllMaterialsController;
// Controller for fetching a single material by ID
const getMaterialByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const material = yield (0, materials_service_1.getMaterialById)(Number(id));
        if (!material) {
            return res.status(404).json({ error: "Material not found" });
        }
        res.status(200).json(material);
    }
    catch (error) {
        res.status(500).json({ error: "Error fetching material" });
    }
});
exports.getMaterialByIdController = getMaterialByIdController;
// Controller for updating a material
const updateMaterialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const materialData = req.body;
    try {
        const updatedMaterial = yield (0, materials_service_1.updateMaterial)(Number(id), materialData);
        res.status(200).json(updatedMaterial);
    }
    catch (error) {
        res.status(500).json({ error: "Error updating material" });
    }
});
exports.updateMaterialController = updateMaterialController;
// Controller for deleting a material
const deleteMaterialController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, materials_service_1.deleteMaterial)(Number(id));
        res.status(204).json();
    }
    catch (error) {
        res.status(500).json({ error: "Error deleting material" });
    }
});
exports.deleteMaterialController = deleteMaterialController;
