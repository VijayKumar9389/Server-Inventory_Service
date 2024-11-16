import { Request, Response } from "express";
import {Location} from "@prisma/client";
import { createLocation, getAllLocations, getLocationById, updateLocation, deleteLocation } from '../services/location.services';
import {CreateLocationDTO, UpdateLocationDTO} from "../models/location.models";

// Fetch all locations
export const getAllLocationsHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const locations: Location[] = await getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching locations', error });
    }
};

// Create a new location handler
export const createLocationHandler = async (req: Request, res: Response): Promise<void> => {
    const { name, address }: CreateLocationDTO = req.body; // Type the incoming request body

    try {
        const newLocation = await createLocation({ name, address });
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ message: 'Error creating location', error });
    }
};

// Fetch a location by ID
export const getLocationByIdHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const location = await getLocationById(Number(id));
        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({ message: 'Location not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching location', error });
    }
};

// Update a location handler
export const updateLocationHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { name, address }: UpdateLocationDTO = req.body; // Type the incoming request body

    try {
        const updatedLocation = await updateLocation(Number(id), { name, address });
        res.status(200).json(updatedLocation);
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};

// Delete a location by ID
export const deleteLocationHandler = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await deleteLocation(Number(id));
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ message: 'Error deleting location', error });
    }
};