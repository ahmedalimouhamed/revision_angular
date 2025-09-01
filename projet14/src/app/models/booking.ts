export interface Booking {
    id: string;
    roomId: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    organizer: string;
    participants: string[];
    status: 'confirmed' | 'pending' | 'cancelled';
    createdAt: Date;
}

export interface BookingRequest{
    roomId: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
    organizer: string;
    participants: string[];
}

