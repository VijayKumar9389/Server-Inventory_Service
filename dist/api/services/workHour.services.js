"use strict";
// src/services/workHour.services.ts
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
exports.deleteWorkHour = exports.updateWorkHour = exports.getWorkHoursByUserId = exports.createWorkHour = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Create a work hour
const createWorkHour = (workHourData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.workHour.create({
        data: workHourData,
    });
});
exports.createWorkHour = createWorkHour;
// Get work hours by user ID
const getWorkHoursByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.workHour.findMany({
        where: { userId },
    });
});
exports.getWorkHoursByUserId = getWorkHoursByUserId;
// Update work hour by ID
const updateWorkHour = (id, workHourData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.workHour.update({
        where: { id },
        data: workHourData,
    });
});
exports.updateWorkHour = updateWorkHour;
// Delete work hour by ID
const deleteWorkHour = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.workHour.delete({
        where: { id },
    });
});
exports.deleteWorkHour = deleteWorkHour;
