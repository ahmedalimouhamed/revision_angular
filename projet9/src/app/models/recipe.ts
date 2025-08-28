import { RecipeCategory } from "./recipe-category";

export interface Recipe {
    id: number;
    title: string;
    category: RecipeCategory;
    ingredients: string[];
    instructions: string;
    cookingTime: number;
    imageUrl?: string;
}
