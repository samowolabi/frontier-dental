import { useState, useEffect } from "react"
import { useProductContext } from "../../../contexts/productContext";
import { fetchProducts } from "../../../services/api/products.api";
import AdminProductCard from "../../../components/admin/AdminProductCard";
import { LoadingSkeleton } from "../../../components/shared/LoadingSkeleton";
import Buttons from "../../../components/shared/Buttons";
import { AddProduct, UpdateProduct } from "./AddUpdateProduct";
import type { ProductType } from "../../../types/types";


export default function AdminProductManagement() {
    const { productState, dispatch } = useProductContext();
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
    const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    // Handle product click for editing
    const handleProductClick = (product: ProductType) => {
        setSelectedProduct(product);
        setIsUpdateProductModalOpen(true);
    };

    // Fetch products on component mount and update context
    useEffect(() => {
        const getProducts = async () => {
            // Set loading to true before fetching
            dispatch({ type: "SET_LOADING", payload: { loading: true } });

            // Fetch products from the API
            const products = await fetchProducts();
            dispatch({ type: "SET_PRODUCTS", payload: { products } });

            // Set loading to false after fetching
            dispatch({ type: "SET_LOADING", payload: { loading: false } });
        };

        getProducts();
    }, [dispatch]);


    return (
        <section className="w-full max-w-[86rem] mx-auto p-4 mt-10 lg:mt-14">
            {/* Products Section */}
            <div className="w-full">
                <div className="w-full flex justify-between items-center mb-10">
                    <h2 className="text-2xl font-semibold tracking-tighter">Product Management</h2>
                    <Buttons.PrimaryButton onClick={() => setIsAddProductModalOpen(true)}>Add Product</Buttons.PrimaryButton>
                </div>

                {
                    productState.loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="flex flex-col">
                                    <LoadingSkeleton height={288} />
                                    <div className="mt-2">
                                        <LoadingSkeleton height={20} className="mb-2" />
                                        <LoadingSkeleton height={16} className="mb-4" />
                                        <LoadingSkeleton height={20} width={80} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : productState.products.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 lg:py-16 px-4">
                            <h3 className="text-lg lg:text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                            <p className="text-gray-500 text-center max-w-md text-sm lg:text-base">
                                There are currently no products available in the system. Please add new products to manage them here.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
                                {productState.products.map((product) => (
                                    <AdminProductCard 
                                        key={product.id} 
                                        product={product} 
                                        onClick={handleProductClick}
                                    />
                                ))}
                            </div>
                        </>
                    )
                }
            </div>

            {/* Add Product Modal */}
            <AddProduct
                isOpen={isAddProductModalOpen}
                onClose={() => setIsAddProductModalOpen(false)}
                onSuccess={() => {
                    // Optionally refresh the product list or show success message
                    console.log("Product added successfully");
                }}
            />

            {/* Update Product Modal */}
            <UpdateProduct
                isOpen={isUpdateProductModalOpen}
                onClose={() => {
                    setIsUpdateProductModalOpen(false);
                    setSelectedProduct(null);
                }}
                product={selectedProduct}
                onSuccess={() => {
                    console.log("Product updated successfully");
                    setSelectedProduct(null);
                }}
            />
        </section>
    )
}