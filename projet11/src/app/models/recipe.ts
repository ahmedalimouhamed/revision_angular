import { RecipeCategory } from "./recipe-category";

export interface Recipe {
    id: string;
    title: string;
    category: RecipeCategory;
    ingredients: string[];
    instructions: string;
    cookingTime: number;
    createdAt: Date;
    updatedAt?: Date;
    imageUrl?: string;
}
