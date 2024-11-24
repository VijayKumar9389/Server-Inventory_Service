import { Request, Response } from "express";
import * as toolServices from "../services/tool.services";
import { Tool } from "@prisma/client";
import {CreateToolDTO, ToolWithRelations, UpdateToolDTO} from "../models/tool.models";
import fs from 'fs';
import path from 'path';

export const getAllItems = async (req: Request, res: Response) => {
    try {
        const tools: ToolWithRelations[] = await toolServices.getAllTools();
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

export const getToolsByLocation = async (req: Request, res: Response) => {
    const locationId = parseInt(req.params.locationId);
    try {
        const tools: Tool[] = await toolServices.getToolsByLocation(locationId);
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
}

export const getItemById = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id);
    try {
        const item: ToolWithRelations = await toolServices.getToolById(itemId);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching item', error });
    }
};

export const getItemsByCategory = async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.categoryId);
    try {
        const items = await toolServices.getToolByCategory(categoryId);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

export const createItem = async (req: Request, res: Response) => {
    const imageFile: Express.Multer.File | undefined = req.file;

    try {
        const { name, serialNumber, cost, locationId, categoryId, status } = req.body;

        // If an image is uploaded, store its path (or URL)
        let imageUrl: string | undefined = undefined;
        if (imageFile) {
            // Assuming the 'uploads' folder is where the image is saved
            imageUrl = imageFile.filename; // Construct the file URL or path
        }

        // Construct the item data including the imageUrl if it exists
        const itemData: CreateToolDTO = {
            name,
            serialNumber,
            cost: cost ? parseFloat(cost) : undefined, // Ensure cost is numeric
            locationId: parseInt(locationId),           // Convert to number
            categoryId: categoryId ? parseInt(categoryId) : undefined, // Optional conversion
            status,
            imageUrl,  // Pass the image URL here
        };

        // Save the item data in the database
        const item = await toolServices.createTool(itemData);
        res.status(201).json(item); // Send the created item as the response
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Error creating item', error });
    }
};


export const updateItem = async (req: Request, res: Response): Promise<void> => {
    const itemId = parseInt(req.params.id);
    const imageFile: Express.Multer.File | undefined = req.file;

    try {
        // Extract existing item from the database
        const existingItem = await toolServices.getToolById(itemId);

        if (!existingItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        // Handle image URL
        let imageUrl: string | undefined = imageFile ? imageFile.filename : existingItem.imageUrl ?? undefined;

        // Parse locationId, categoryId, and cost as numbers
        const locationId = req.body.locationId ? parseInt(req.body.locationId) : undefined;
        const categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : undefined;
        const cost = req.body.cost ? parseFloat(req.body.cost) : undefined;

        // Delete the old image if a new one is uploaded
        if (imageFile && existingItem.imageUrl) {
            const oldImagePath = path.join(__dirname, '..', '..', 'uploads', existingItem.imageUrl);

            // Use a promise-based approach to handle file deletion
            try {
                await fs.promises.unlink(oldImagePath);
                console.log('Old image deleted successfully');
            } catch (err) {
                console.error('Error deleting old image:', err);
            }
        }

        // Prepare updated item data
        const updatedData: UpdateToolDTO = {
            ...req.body,
            imageUrl,   // New image URL or old one if no new image uploaded
            locationId, // Ensuring locationId is a number
            categoryId, // Ensuring categoryId is a number
            cost,       // Ensuring cost is a number
        };

        // Update the item data in the database
        const updatedItem: Tool = await toolServices.updateTool(itemId, updatedData);
        res.status(200).json(updatedItem); // Send the updated item as a response
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item', error });
    }
};



export const deleteItem = async (req: Request, res: Response) => {
    const itemId = parseInt(req.params.id);

    try {
        // Fetch the existing item to get its image URL
        const existingItem = await toolServices.getToolById(itemId);

        if (!existingItem) {
            res.status(404).json({ message: 'Item not found' });
            return;
        }

        // Check if the item has an associated image URL
        if (existingItem.imageUrl) {
            const imagePath = path.join(__dirname, '..', '..', 'src', 'uploads', existingItem.imageUrl);

            // Check if the image file exists and delete it
            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    } else {
                        console.log('Image file deleted successfully');
                    }
                });
            }
        }

        // Delete the item from the database
        await toolServices.deleteTool(itemId);
        res.status(204).send(); // No content to send
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item', error });
    }
};