import { createContext, useContext, useReducer } from "react";
import { initialProductState, productReducer } from "./productReducer";
import type { ProductStateTypes, ProductActionTypes } from "./productReducerTypes";

const ProductContext = createContext<{
    productState: ProductStateTypes;
    dispatch: React.Dispatch<ProductActionTypes>;
} | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
    const [productState, dispatch] = useReducer(productReducer, initialProductState);

    return (
        <ProductContext.Provider value={{ productState, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
};
