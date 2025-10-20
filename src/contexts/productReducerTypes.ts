import type { ProductType } from "../types/types";


export type ProductStateTypes = {
    products: ProductType[],
    searchQueries: string[],
    loading: boolean
}


export type ProductActionTypes = (
    {
        type: "SET_PRODUCTS";
        payload: {
            products: ProductType[];
        }
    } | {
        type: "ADD_PRODUCT";
        payload: {
            product: ProductType;
        }
    } | {
        type: "UPDATE_PRODUCT";
        payload: {
            product: ProductType;
        }
    } | {
        type: "REMOVE_PRODUCT";
        payload: {
            productId: string;
        }
    } | {
        type: "ADD_TO_SEARCH_QUERY";
        payload: {
            query: string;
        }
    } | {
        type: "REMOVE_FROM_SEARCH_QUERY";
        payload: {
            query: string;
        }
    } | {
        type: "CLEAR_SEARCH_QUERY";
    } | {
        type: "SET_LOADING";
        payload: {
            loading: boolean;
        }
    }
);