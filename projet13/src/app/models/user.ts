export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'moderator' | 'user';
    department: string;
    status: 'active' | 'inactive' | 'pending';
    createdAt: Date;
    lastLogin?: Date;
    avatar?: string;
}

export interface UserFilters{
    name?: string;
    role?: string;
    department?: string;
    status?: string;
}
