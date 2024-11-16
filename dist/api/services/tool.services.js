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
exports.deleteTool = exports.getToolById = exports.getAllTools = exports.updateTool = exports.createTool = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Create a new instance of PrismaClient
const createTool = (itemData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tool.create({
        data: itemData,
    });
});
exports.createTool = createTool;
const updateTool = (id, itemData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tool.update({
        where: { id },
        data: itemData,
    });
});
exports.updateTool = updateTool;
const getAllTools = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tool.findMany();
});
exports.getAllTools = getAllTools;
const getToolById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tool.findUnique({
        where: { id },
    });
});
exports.getToolById = getToolById;
const deleteTool = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.tool.delete({
        where: { id },
    });
});
exports.deleteTool = deleteTool;
