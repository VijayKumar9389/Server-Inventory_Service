import { PrismaClient, Location } from '@prisma/client';
import {CreateLocationDTO} from "../models/location.models"; // Import PrismaClient and Location model

const prisma = new PrismaClient(); // Create a new instance of PrismaClient

// Create a new location
export const createLocation = async (locationData: CreateLocationDTO) => {
    return prisma.location.create({
        data: locationData,
    });
};

// Fetch all locations
export const getAllLocations = async (): Promise<Location[]> => {
    return prisma.location.findMany();
};

// Fetch a single location by ID
export const getLocationById = async (id: number): Promise<Location | null> => {
    return prisma.location.findUnique({
        where: { id },
    });
};

// Update a location
export const updateLocation = async (id: number, locationData: Partial<Omit<Location, 'id'>>) => {
    return prisma.location.update({
        where: { id },
        data: locationData,
    });
};

// Delete a location
export const deleteLocation = async (id: number) => {
    return prisma.location.delete({
        where: { id },
    });
};