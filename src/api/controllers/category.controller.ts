import { Response, Request } from "express";
import { CreateCategoryDTO } from "../models/category.models";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../services/category.services";

export const createCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData: CreateCategoryDTO = req.body;
        const newCategory = await createCategory(categoryData);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error || 'Error creating category' });
    }
};

export const getAllCategoriesController = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error || 'Error fetching categories' });
    }
};

export const getCategoryByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const category = await getCategoryById(id);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        } else {
            res.status(200).json(category);
        }
    } catch (error) {
        res.status(500).json({ error: error || 'Error fetching category' });
    }
};

export const updateCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        const categoryData: Partial<CreateCategoryDTO> = req.body;
        const updatedCategory = await updateCategory(id, categoryData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error || 'Error updating category' });
    }
};

export const deleteCategoryController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        await deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error || 'Error deleting category' });
    }
};