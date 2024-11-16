// DTO for creating a new location
export interface CreateLocationDTO {
    name: string;         // Required name of the location
    address?: string;     // Optional address of the location
}

// DTO for updating an existing location
export interface UpdateLocationDTO {
    name?: string;        // Optional new name of the location
    address?: string;     // Optional new address of the location
}