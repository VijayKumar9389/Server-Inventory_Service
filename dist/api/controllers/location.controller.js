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
exports.deleteLocationHandler = exports.updateLocationHandler = exports.getLocationByIdHandler = exports.createLocationHandler = exports.getAllLocationsHandler = void 0;
const location_services_1 = require("../services/location.services");
// Fetch all locations
const getAllLocationsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield (0, location_services_1.getAllLocations)();
        res.status(200).json(locations);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
});
exports.getAllLocationsHandler = getAllLocationsHandler;
// Create a new location handler
const createLocationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address } = req.body; // Type the incoming request body
    try {
        const newLocation = yield (0, location_services_1.createLocation)({ name, address });
        res.status(201).json(newLocation);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating location', error });
    }
});
exports.createLocationHandler = createLocationHandler;
// Fetch a location by ID
const getLocationByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const location = yield (0, location_services_1.getLocationById)(Number(id));
        if (location) {
            res.status(200).json(location);
        }
        else {
            res.status(404).json({ message: 'Location not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching location', error });
    }
});
exports.getLocationByIdHandler = getLocationByIdHandler;
// Update a location handler
const updateLocationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, address } = req.body; // Type the incoming request body
    try {
        const updatedLocation = yield (0, location_services_1.updateLocation)(Number(id), { name, address });
        res.status(200).json(updatedLocation);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
});
exports.updateLocationHandler = updateLocationHandler;
// Delete a location by ID
const deleteLocationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, location_services_1.deleteLocation)(Number(id));
        res.status(204).send(); // No content
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting location', error });
    }
});
exports.deleteLocationHandler = deleteLocationHandler;
