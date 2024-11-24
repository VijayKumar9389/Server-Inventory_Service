import {Category, Inventory, Material} from "@prisma/client";

export interface CreateMaterialDTO {
    name: string;           // Name of the material (Required)
    costPerUnit?: number;   // Optional cost per unit (can be mapped to Decimal in the database)
    imageUrl?: string;      // Optional URL for the material's image
    categoryId?: number;    // Optional foreign key for the category
}

export interface UpdateMaterialDTO {
    id: number;  // ID of the material to update
    name: string;  // The name of the material
    quantity: number;  // Amount of material available
    unit: string;  // Unit of measurement (e.g., kg, pieces)
    locationId: number;  // Foreign key reference for the location
    categoryId?: number; // Optional foreign key reference for the category
    imageUrl?: string;  // Optional URL for the material's image
}

// create-inventory.dto.ts

export interface CreateInventoryDTO {
    materialId: number;
    locationId: number;
    quantity: number;
}

// Material with inventory details
export interface MaterialWithInventoryDTO extends Material{
    category?: Category;
    inventory?: Inventory[];
}