import { FamilyMember } from "../models/family-member";

export interface FamilyTask {
    id: number;
    title: string;
    assignedTo: FamilyMember | null;
    completed: boolean;
}
