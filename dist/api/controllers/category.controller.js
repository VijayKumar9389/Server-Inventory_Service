"use strict";
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
exports.deleteCategoryController = exports.updateCategoryController = exports.getCategoryByIdController = exports.getAllCategoriesController = exports.createCategoryController = void 0;
const category_services_1 = require("../services/category.services");
const createCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryData = req.body;
        const newCategory = yield (0, category_services_1.createCategory)(categoryData);
        res.status(201).json(newCategory);
    }
    catch (error) {
        res.status(500).json({ error: error || 'Error creating category' });
    }
});
exports.createCategoryController = createCategoryController;
const getAllCategoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, category_services_1.getAllCategories)();
        res.status(200).json(categories);
    }
    catch (error) {
        res.status(500).json({ error: error || 'Error fetching categories' });
    }
});
exports.getAllCategoriesController = getAllCategoriesController;
const getCategoryByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const category = yield (0, category_services_1.getCategoryById)(id);
        if (!category) {
            res.status(404).json({ error: 'Category not found' });
        }
        else {
            res.status(200).json(category);
        }
    }
    catch (error) {
        res.status(500).json({ error: error || 'Error fetching category' });
    }
});
exports.getCategoryByIdController = getCategoryByIdController;
const updateCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const categoryData = req.body;
        const updatedCategory = yield (0, category_services_1.updateCategory)(id, categoryData);
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        res.status(500).json({ error: error || 'Error updating category' });
    }
});
exports.updateCategoryController = updateCategoryController;
const deleteCategoryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield (0, category_services_1.deleteCategory)(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error || 'Error deleting category' });
    }
});
exports.deleteCategoryController = deleteCategoryController;
