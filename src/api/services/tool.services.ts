import {PrismaClient, Tool} from '@prisma/client';
import {CreateToolDTO, UpdateToolDTO} from "../models/tool.models"; // Import PrismaClient and User model

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

export const getAllTools = async (): Promise<Tool[]> => {
    return prisma.tool.findMany();
};

export const getToolById = async (id: number): Promise<Tool | null> => {
    return prisma.tool.findUnique({
        where: {id},
    });
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

