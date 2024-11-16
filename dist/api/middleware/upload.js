"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
// Configure multer storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads/'); // Define the upload directory
    },
    filename: (req, file, cb) => {
        const randomName = (0, uuid_1.v4)(); // Generate a unique identifier for the file
        const fileExtension = file.originalname.split('.').pop(); // Extract file extension
        cb(null, `${randomName}.${fileExtension}`); // Create a new file name
    },
});
// Create an instance of multer with the configured storage
const upload = (0, multer_1.default)({ storage });
exports.default = upload;
