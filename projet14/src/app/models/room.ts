export interface Room {
    id: string;
    name: string;
    capacity: number;
    equipement: string[];
    location: string;
    floor: number;
    hourlyRate: number;
    available: boolean;
}
