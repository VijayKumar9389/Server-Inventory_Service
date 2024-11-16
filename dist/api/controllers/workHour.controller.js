"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const workHourService = __importStar(require("../services/workHour.services"));
// Handle errors uniformly
const handleError = (res, error) => {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
};
// Create a work hour
const createWorkHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workHourData = req.body;
        const newWorkHour = yield workHourService.createWorkHour(workHourData);
        return res.status(201).json(newWorkHour);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.createWorkHour = createWorkHour;
// Get work hours by user ID
const getWorkHoursByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId, 10);
        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const workHours = yield workHourService.getWorkHoursByUserId(userId);
        return res.status(200).json(workHours);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.getWorkHoursByUserId = getWorkHoursByUserId;
// Update work hour by ID
const updateWorkHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid work hour ID' });
        }
        const workHourData = req.body;
        const updatedWorkHour = yield workHourService.updateWorkHour(id, workHourData);
        return res.status(200).json(updatedWorkHour);
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.updateWorkHour = updateWorkHour;
// Delete work hour by ID
const deleteWorkHour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'Invalid work hour ID' });
        }
        yield workHourService.deleteWorkHour(id);
        return res.status(204).send();
    }
    catch (error) {
        handleError(res, error);
    }
});
exports.deleteWorkHour = deleteWorkHour;
