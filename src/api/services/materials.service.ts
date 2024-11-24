import { PrismaClient, Material } from "@prisma/client";
import {CreateInventoryDTO, CreateMaterialDTO, MaterialWithInventoryDTO} from "../models/material.models";

const prisma = new PrismaClient();

// ============ Material Operations ============ //
// Create a new material
export const createMaterial = async (materialData: CreateMaterialDTO) => {
    return prisma.material.create({
        data: materialData,
    });
};
// Fetch all materials
export const getAllMaterials = async (): Promise<MaterialWithInventoryDTO[]> => {
    const materials = await prisma.material.findMany({
        include: {
            category: true,
            inventory: true,
        },
    });

    return materials.map((material) => ({
        ...material,
        category: material.category || undefined, // Convert null to undefined
        inventory: material.inventory.length ? material.inventory : undefined, // Handle empty inventory
    }));
};

// Fetch a single material by ID
export const getMaterialById = async (id: number): Promise<MaterialWithInventoryDTO> => {
    const material = await prisma.material.findUnique({
        where: { id },
        include: {
            category: true,
            inventory: true,
        },
    });

    if (!material) {
        throw new Error(`Material with ID ${id} not found`);
    }

    return material as MaterialWithInventoryDTO;
};

// Fetch materials by category ID
export const getMaterialsByCategory = async (categoryId: number): Promise<Material[]> => {
    return prisma.material.findMany({
        where: { categoryId },
    });
};

// Update a material
export const updateMaterial = async (id: number, materialData: Partial<Omit<Material, 'id'>>) => {
    return prisma.material.update({
        where: { id },
        data: materialData,
    });
};

// Delete a material
export const deleteMaterial = async (id: number) => {
    return prisma.material.delete({
        where: { id },
    });
};

// ============ Inventory Operations ============ //
// Create a new inventory record
export const createInventory = async (data: CreateInventoryDTO) => {
    return prisma.inventory.create({
        data: data,
    });
};

// Fetch inventory by Material ID, including Location details
export const getInventoryByMaterialId = async (materialId: number) => {
    return prisma.inventory.findMany({
        where: { materialId },
        include: {
            location: true, // Include related Location data
        },
    });
};

// Fetch inventory by Location ID, including Material details
export const getInventoryByLocationId = async (locationId: number) => {
    return prisma.inventory.findMany({
        where: { locationId },
        include: {
            material: true, // Include related Material data
        },
    });
};

// Delete an inventory record by ID
export const deleteInventory = async (id: number) => {
    return prisma.inventory.delete({
        where: { id },
    });
};