export interface Product{
    id: string;
    name: string;
    category: string;
    quantity: number;
    price: number;
    supplier: string;
    lastUpdated: Date;
    minStock: number;
}