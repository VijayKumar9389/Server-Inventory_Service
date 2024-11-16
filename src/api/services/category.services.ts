import {PrismaClient, Category} from "@prisma/client";
import {CreateCategoryDTO} from "../models/category.models";

const prisma = new PrismaClient();

export const createCategory = async (categoryData: CreateCategoryDTO) => {
    return prisma.category.create({
        data: categoryData,
    });
};

export const getAllCategories = async (): Promise<Category[]> => {
    return prisma.category.findMany();
};

export const getCategoryById = async (id: number): Promise<Category | null> => {
    return prisma.category.findUnique({
        where: {id},
    });
};

export const updateCategory = async (id: number, categoryData: Partial<CreateCategoryDTO>) => {
    return prisma.category.update({
        where: {id},
        data: categoryData,
    });
};

export const deleteCategory = async (id: number) => {
    return prisma.category.delete({
        where: {id},
    });
};

