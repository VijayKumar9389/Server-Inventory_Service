import { PrismaClient, User } from '@prisma/client';
import {CreateUserDTO, UpdateUserDTO} from "../models/user.models"; // Import PrismaClient and User model

const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Create a new user using CreateUserDTO
export const createUser = async (userData: CreateUserDTO) => {
    return prisma.user.create({
        data: {
            ...userData,
            isActive: userData.isActive ?? true, // Set default to true if not provided
        },
    });
};

// Get all users
export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany();
};

// Get a user by ID
export const getUserById = async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id },
    });
};

// Update a user using UpdateUserDTO
export const updateUser = async (id: number, userData: UpdateUserDTO) => {
    return prisma.user.update({
        where: { id },
        data: userData,
    });
};

// Delete a user by ID
export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: { id },
    });
};