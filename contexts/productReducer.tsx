import type { ProductStateTypes, ProductActionTypes } from "./productReducerTypes";

export const initialProductState: ProductStateTypes = {
    products: [],
    searchQueries: [],
    loading: false
};

export const productReducer = (state: ProductStateTypes, action: ProductActionTypes): ProductStateTypes => {
    switch (action.type) {
        case "SET_PRODUCTS": {
            return {
                ...state,
                products: action.payload.products,
            };
        }
        case "ADD_PRODUCT": {
            return {
            ...state,
            products: [action.payload.product, ...state.products],
            };
        }
        case "UPDATE_PRODUCT": {
            const updatedProducts = state.products.map((product) =>
                product.id === action.payload.product.id ? action.payload.product : product
            );
            return {
                ...state,
                products: updatedProducts,
            };
        }
        case "REMOVE_PRODUCT": {
            const filteredProducts = state.products.filter(
                (product) => product.id !== action.payload.productId
            );
            return {
                ...state,
                products: filteredProducts,
            };
        }
        case "ADD_TO_SEARCH_QUERY": {
            // Prevent duplicate queries
            if (state.searchQueries.includes(action.payload.query)) {
                return state;
            }

            return {
                ...state,
                searchQueries: [...state.searchQueries, action.payload.query],
            };
        }
        case "REMOVE_FROM_SEARCH_QUERY": {
            const updatedsearchQueries = state.searchQueries.filter(
                (query) => query !== action.payload.query
            );
            return {
                ...state,
                searchQueries: updatedsearchQueries,
            };
        }
        case "CLEAR_SEARCH_QUERY": {
            return {
                ...state,
                searchQueries: [],
            };
        }
        case "SET_LOADING": {
            return {
                ...state,
                loading: action.payload.loading,
            };
        }
        default:
            return state;
    }
};

