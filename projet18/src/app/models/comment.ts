import { User } from "./user";

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    likes: number;
    isLiked: boolean;
    replies: Comment[];
    parentId?: number;
    mentions: string[];
}
