import {PrismaClient, Tool} from '@prisma/client';
import {CreateToolDTO, ToolWithRelations, UpdateToolDTO} from "../models/tool.models"; // Import PrismaClient and User model

const prisma = new PrismaClient(); // Create a new instance of PrismaClient

export const createTool = async (itemData: CreateToolDTO) => {
    return prisma.tool.create({
        data: itemData,
    });
};

export const updateTool = async (id: number, itemData: UpdateToolDTO) => {
    return prisma.tool.update({
        where: {id},
        data: itemData,
    });
};

// Get all tools with location and category
export const getAllTools = async (): Promise<ToolWithRelations[]> => {
    return prisma.tool.findMany({
        include: {
            location: true,
            category: true,
        },
    });
};

export const getToolById = async (id: number): Promise<ToolWithRelations> => {
    const tool = await prisma.tool.findUnique({
        where: { id },
        include: {
            location: true,
            category: true,
        }
    });

    if (!tool) {
        throw new Error(`Tool with ID ${id} not found`);
    }

    return tool as ToolWithRelations;
}

export const getToolByCategory = async (categoryId: number): Promise<Tool[]> => {
    return prisma.tool.findMany({
        where: {categoryId},
    });
}

export const getToolsByLocation = async (locationId: number): Promise<Tool[]> => {
    return prisma.tool.findMany({
        where: {locationId},
    });
}


export const deleteTool = async (id: number) => {
    return prisma.tool.delete({
        where: {id},
    });
};

