export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    ratingCount: number;
    imageUrl?: string;
}
