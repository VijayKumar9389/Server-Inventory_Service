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
exports.deleteItem = exports.getItemById = exports.updateItem = exports.createItem = exports.getAllItems = void 0;
const toolServices = __importStar(require("../services/tool.services"));
const getAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tools = yield toolServices.getAllTools();
        res.status(200).json(tools);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
});
exports.getAllItems = getAllItems;
const createItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imageFile = req.file;
    try {
        const { name, serialNumber, cost, locationId, categoryId, status } = req.body;
        // If an image is uploaded, store its path (or URL)
        let imageUrl = undefined;
        if (imageFile) {
            // Assuming the 'uploads' folder is where the image is saved
            imageUrl = imageFile.filename; // Construct the file URL or path
        }
        // Construct the item data including the imageUrl if it exists
        const itemData = {
            name,
            serialNumber,
            cost: cost ? parseFloat(cost) : undefined, // Ensure cost is numeric
            locationId: parseInt(locationId), // Convert to number
            categoryId: categoryId ? parseInt(categoryId) : undefined, // Optional conversion
            status,
            imageUrl, // Pass the image URL here
        };
        // Save the item data in the database
        const item = yield toolServices.createTool(itemData);
        res.status(201).json(item); // Send the created item as the response
    }
    catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Error creating item', error });
    }
});
exports.createItem = createItem;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params.id);
    const imageFile = req.file; // Check for new image file
    try {
        // Extract existing item from the database
        const existingItem = yield toolServices.getToolById(itemId);
        // Check if the existing item was found
        if (!existingItem) {
            return res.status(404).json({ message: 'Item not found' }); // Return 404 if not found
        }
        // Determine the new image URL based on whether a new file is uploaded
        let imageUrl = undefined; // Default to undefined
        if (imageFile) {
            imageUrl = imageFile.filename; // Use new file if present
        }
        else {
            // If no new file, retain the existing image URL
            imageUrl = existingItem.imageUrl || undefined; // Retain existing image URL or set to undefined
        }
        // Prepare updated item data
        const updatedData = Object.assign(Object.assign({}, req.body), { imageUrl });
        // Update the item data in the database
        const updatedItem = yield toolServices.updateTool(itemId, updatedData);
        return res.status(200).json(updatedItem); // Ensure a response is returned here
    }
    catch (error) {
        console.error('Error updating item:', error);
        return res.status(500).json({ message: 'Error updating item', error });
    }
});
exports.updateItem = updateItem;
const getItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params.id);
    try {
        const item = yield toolServices.getToolById(itemId);
        if (item) {
            res.status(200).json(item);
        }
        else {
            res.status(404).json({ message: 'Item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
});
exports.getItemById = getItemById;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const itemId = parseInt(req.params.id);
    try {
        yield toolServices.deleteTool(itemId);
        res.status(204).send(); // No content to send
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
});
exports.deleteItem = deleteItem;
