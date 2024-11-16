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
exports.deleteUser = exports.updateUser = exports.getUserById = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Create a new instance of PrismaClient
// Create a new user using CreateUserDTO
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return prisma.user.create({
        data: Object.assign(Object.assign({}, userData), { isActive: (_a = userData.isActive) !== null && _a !== void 0 ? _a : true }),
    });
});
exports.createUser = createUser;
// Get all users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany();
});
exports.getAllUsers = getAllUsers;
// Get a user by ID
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findUnique({
        where: { id },
    });
});
exports.getUserById = getUserById;
// Update a user using UpdateUserDTO
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.update({
        where: { id },
        data: userData,
    });
});
exports.updateUser = updateUser;
// Delete a user by ID
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
