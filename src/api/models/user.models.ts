// Define the Role enum
export enum Role {
    EMPLOYEE = 'EMPLOYEE',
    MANAGER = 'MANAGER',
    ADMIN = 'ADMIN',
}

// Interface for creating a user
export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    contactNumber?: string; // Optional
    isActive?: boolean;     // Optional, defaults to true
    role: Role;             // Role is now required and typed with the Role enum
}

// Interface for updating a user
export interface UpdateUserDTO {
    name?: string; // Optional
    email?: string; // Optional
    password?: string; // Optional
    contactNumber?: string; // Optional
    isActive?: boolean; // Optional
    role?: Role;        // Role is optional and typed with the Role enum
}
