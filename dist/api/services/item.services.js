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
exports.deleteItem = exports.updateItem = exports.getItemById = exports.getAllItems = exports.createItem = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Create a new instance of PrismaClient
const createItem = (itemData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.item.create({
        data: itemData,
    });
});
exports.createItem = createItem;
const getAllItems = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.item.findMany();
});
exports.getAllItems = getAllItems;
const getItemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.item.findUnique({
        where: { id },
    });
});
exports.getItemById = getItemById;
const updateItem = (id, itemData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.item.update({
        where: { id },
        data: itemData,
    });
});
exports.updateItem = updateItem;
const deleteItem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.item.delete({
        where: { id },
    });
});
exports.deleteItem = deleteItem;
