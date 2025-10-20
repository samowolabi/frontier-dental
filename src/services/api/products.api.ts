import { axiosInstance } from "./client";
import type { ProductType } from "../../types/types";

// Fetch all products
export const fetchProducts = async (): Promise<ProductType[]> => {
    try {
        const response = await axiosInstance.get('/');
        return response.data.record.products || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};