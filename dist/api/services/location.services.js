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
exports.deleteLocation = exports.updateLocation = exports.getLocationById = exports.getAllLocations = exports.createLocation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient(); // Create a new instance of PrismaClient
// Create a new location
const createLocation = (locationData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.location.create({
        data: locationData,
    });
});
exports.createLocation = createLocation;
// Fetch all locations
const getAllLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.location.findMany();
});
exports.getAllLocations = getAllLocations;
// Fetch a single location by ID
const getLocationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.location.findUnique({
        where: { id },
    });
});
exports.getLocationById = getLocationById;
// Update a location
const updateLocation = (id, locationData) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.location.update({
        where: { id },
        data: locationData,
    });
});
exports.updateLocation = updateLocation;
// Delete a location
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.location.delete({
        where: { id },
    });
});
exports.deleteLocation = deleteLocation;
