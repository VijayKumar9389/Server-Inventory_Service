import { Request, Response } from "express";
import {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
    getMaterialsByCategory, createInventory, getInventoryByMaterialId, getInventoryByLocationId, deleteInventory
} from "../services/materials.service";
import {CreateInventoryDTO, CreateMaterialDTO, UpdateMaterialDTO} from "../models/material.models";
import fs from "fs";
import path from "path";

// Controller for creating a new material
export const createMaterialController = async (req: Request, res: Response) => {
    const imageFile: Express.Multer.File | undefined = req.file; // Retrieve the uploaded file

    try {
        // Destructure other fields from the request body
        const { name, costPerUnit, categoryId } = req.body;

        // If an image is uploaded, store its path (or URL)
        let imageUrl: string | undefined = undefined;
        if (imageFile) {
            // Assuming the 'uploads' folder is where the image is saved
            imageUrl = imageFile.filename; // Construct the file URL or path
        }

        // Construct the material data including the imageUrl if it exists
        const materialData: CreateMaterialDTO = {
            name,
            costPerUnit: costPerUnit ? parseFloat(costPerUnit) : undefined, // Ensure cost is numeric
            imageUrl,  // Pass the image URL here
            categoryId: categoryId ? parseInt(categoryId) : undefined, // Optional conversion
        };

        // Save the material data in the database
        const newMaterial = await createMaterial(materialData);
        res.status(201).json(newMaterial); // Send the created material as the response
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: "Error creating material" });
    }
};

export const createInventoryController = async (req: Request, res: Response) => {
    try {
        const data: CreateInventoryDTO = {
            materialId: +req.body.materialId,
            locationId: +req.body.locationId,
            quantity: +req.body.quantity,
        };

        const inventory = await createInventory(data);
        res.status(201).json(inventory);
    } catch (error) {
        console.error('Error creating inventory:', error);
        res.status(500).json({ error: 'Error creating inventory' });
    }
};

export const getInventoryByMaterialIdController = async (req: Request, res: Response) => {
    const materialId = +req.params.materialId;
    try {
        const inventory = await getInventoryByMaterialId(materialId);
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Error fetching inventory' });
    }
}

export const getInventoryByLocationIdController = async (req: Request, res: Response) => {
    const locationId = +req.params.locationId;
    try {
        const inventory = await getInventoryByLocationId(locationId);
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ error: 'Error fetching inventory' });
    }
}

// Controller for fetching all materials
export const getAllMaterialsController = async (req: Request, res: Response) => {
    try {
        const materials = await getAllMaterials();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: "Error fetching materials" });
    }
};

// Controller for fetching a single material by ID
export const getMaterialByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const material = await getMaterialById(Number(id));
        if (!material) {
            res.status(404).json({ error: "Material not found" });
        }
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ error: "Error fetching material" });
    }
};

export const getMaterialsByCategoryController = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
        const materials = await getMaterialsByCategory(Number(categoryId));
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: "Error fetching materials" });
    }
}

// Controller for updating a material
export const updateMaterialController = async (req: Request, res: Response): Promise<void> => {
    const materialId = parseInt(req.params.id);
    const imageFile: Express.Multer.File | undefined = req.file;

    try {
        // Fetch the existing material from the database
        const existingMaterial = await getMaterialById(materialId);
        if (!existingMaterial) {
            res.status(404).json({ message: 'Material not found' });
            return;
        }

        // Handle image URL: use the new image if uploaded, otherwise keep the existing one
        let imageUrl: string | undefined = imageFile ? imageFile.filename : existingMaterial.imageUrl ?? undefined;

        // Parse `categoryId` and `costPerUnit` as numbers, converting `null` to `undefined`
        const categoryId = req.body.categoryId ? parseInt(req.body.categoryId) : undefined;
        const costPerUnit = req.body.costPerUnit ? parseFloat(req.body.costPerUnit) : undefined;

        // Delete the old image if a new one is uploaded
        if (imageFile && existingMaterial.imageUrl) {
            const oldImagePath = path.join(__dirname, '..', '..', 'uploads', existingMaterial.imageUrl);
            try {
                await fs.promises.unlink(oldImagePath);
                console.log('Old image deleted successfully');
            } catch (err) {
                console.error('Error deleting old image:', err);
            }
        }

        // Prepare the updated material data
        const materialData: UpdateMaterialDTO = {
            ...req.body,
            imageUrl,      // Use the new or existing image URL
            categoryId,    // Ensure categoryId is either a number or undefined
            costPerUnit,   // Ensure costPerUnit is either a number or undefined
        };

        // Update the material in the database
        const updatedMaterial = await updateMaterial(materialId, materialData);
        res.status(200).json(updatedMaterial);
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ message: 'Error updating material', error });
    }
};

// Controller for deleting a material
export const deleteMaterialController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingMaterial = await getMaterialById(Number(id));
        if (!existingMaterial) {
            res.status(404).json({ error: "Material not found" });
            return;
        }

        // Delete associated image file if exists
        if (existingMaterial.imageUrl) {
            const imagePath = path.join(__dirname, '..', '..', 'uploads', existingMaterial.imageUrl);
            fs.promises.unlink(imagePath).catch(err => console.error('Error deleting image file:', err));
        }

        // Delete material from the database
        await deleteMaterial(Number(id));
        res.status(204).json();
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).json({ error: "Error deleting material" });
    }
};

export const deleteInventoryController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteInventory(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting inventory:', error);
        res.status(500).json({ error: 'Error deleting inventory' });
    }
}