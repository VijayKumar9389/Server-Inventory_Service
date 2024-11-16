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
exports.deleteItem = exports.updateItem = exports.getItemById = exports.createItem = exports.getAllItems = void 0;
const itemService = __importStar(require("../services/item.services"));
const handleResponse = (res, status, data) => res.status(status).json(data);
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield itemService.getAllItems();
        handleResponse(res, 200, items);
    }
    catch (error) {
        handleResponse(res, 500, { message: 'Error fetching items', error });
    }
});
exports.getAllItems = getAllItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const item = yield itemService.createItem(req.body);
        handleResponse(res, 201, item);
    }
    catch (error) {
        handleResponse(res, 500, { message: 'Error creating item', error });
    }
});
exports.createItem = createItem;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params.id);
    try {
        const item = yield itemService.getItemById(itemId);
        if (item) {
            handleResponse(res, 200, item);
        }
        else {
            handleResponse(res, 404, { message: 'Item not found' });
        }
    }
    catch (error) {
        handleResponse(res, 500, { message: 'Error fetching item', error });
    }
});
exports.getItemById = getItemById;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params.id);
    try {
        const updatedItem = yield itemService.updateItem(itemId, req.body);
        handleResponse(res, 200, updatedItem);
    }
    catch (error) {
        handleResponse(res, 500, { message: 'Error updating item', error });
    }
});
exports.updateItem = updateItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params.id);
    try {
        yield itemService.deleteItem(itemId);
        handleResponse(res, 204, {});
    }
    catch (error) {
        handleResponse(res, 500, { message: 'Error deleting item', error });
    }
});
exports.deleteItem = deleteItem;
