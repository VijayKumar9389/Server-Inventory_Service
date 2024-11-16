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
exports.deleteMaterial = exports.updateMaterial = exports.getMaterialById = exports.getAllMaterials = exports.createMaterial = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a new material
const createMaterial = (materialData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.material.create({
        data: materialData,
    });
});
exports.createMaterial = createMaterial;
// Fetch all materials
const getAllMaterials = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.material.findMany();
});
exports.getAllMaterials = getAllMaterials;
// Fetch a single material by ID
const getMaterialById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.material.findUnique({
        where: { id },
    });
});
exports.getMaterialById = getMaterialById;
// Update a material
const updateMaterial = (id, materialData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.material.update({
        where: { id },
        data: materialData,
    });
});
exports.updateMaterial = updateMaterial;
// Delete a material
const deleteMaterial = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.material.delete({
        where: { id },
    });
});
exports.deleteMaterial = deleteMaterial;
