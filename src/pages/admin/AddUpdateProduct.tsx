import { useState, useEffect } from "react";
import { useProductContext } from "../../../contexts/productContext";
import Modal from "../../../components/shared/Modal";
import Buttons from "../../../components/shared/Buttons";
import Forms from "../../../components/shared/Forms";
import type { ProductType } from "../../../types/types";

// Add Product Component
type AddProductProps = {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
};

export function AddProduct({ isOpen, onClose, onSuccess }: AddProductProps) {
    const { dispatch } = useProductContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newProductData, setNewProductData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        oldPrice: 0,
        imageUrl: "",
        available: true
    });

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setNewProductData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 :
                type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                    value
        }));
    };

    // Validate form inputs
    const validateForm = (): { isValid: boolean; errorMessage?: string; } => {
        const { name, description, category, price, oldPrice, imageUrl } = newProductData;

        if (!name.trim() || !description.trim() || !category.trim() || price <= 0 || oldPrice < 0 || !imageUrl.trim()) {
            return { isValid: false, errorMessage: "Please fill in all required fields correctly." };
        }

        // Check that oldPrice is not less than price
        if (oldPrice > 0 && oldPrice < price) {
            return { isValid: false, errorMessage: "Old Price cannot be less than Price." };
        }

        return { isValid: true };
    };

    // Handle Add Product form submission
    const handleAddProduct = async () => {
        const validation = validateForm();
        if (!validation.isValid) {
            alert(validation.errorMessage);
            return;
        }

        console.log("New Product Data:", newProductData);

        setIsSubmitting(true);

        try {
            // Create product with generated ID
            const productWithId: ProductType = {
                id: Date.now().toString(),
                ...newProductData
            };

            // Add the new product to the context
            dispatch({
                type: "ADD_PRODUCT",
                payload: { product: productWithId }
            });

            alert("Product added successfully!");
            resetForm();
            onClose();
            onSuccess?.();
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setNewProductData({
            name: "",
            description: "",
            category: "",
            price: 0,
            oldPrice: 0,
            imageUrl: "",
            available: true
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            open={isOpen}
            setClose={() => handleClose()}
            onClosed={resetForm}
        >
            <div className="w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Add New Product</h2>

                <Forms.FormInput
                    label="Product Name *"
                    type="text"
                    name="name"
                    value={newProductData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                />

                <Forms.TextArea
                    label="Description *"
                    name="description"
                    value={newProductData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={3}
                />

                <Forms.FormInput
                    label="Category *"
                    type="text"
                    name="category"
                    value={newProductData.category}
                    onChange={handleInputChange}
                    placeholder="Enter product category"
                />

                <div className="grid grid-cols-2 gap-4">
                    <Forms.FormInput
                        label="Price ($) *"
                        type="number"
                        name="price"
                        value={newProductData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                    />

                    <Forms.FormInput
                        label="Old Price ($)"
                        type="number"
                        name="oldPrice"
                        value={newProductData.oldPrice}
                        onChange={handleInputChange}
                        placeholder="0.00"
                    />
                </div>

                <Forms.FormInput
                    label="Image URL *"
                    type="url"
                    name="imageUrl"
                    value={newProductData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                />

                <Forms.FormCheckbox
                    label="Available for sale"
                    name="available"
                    checked={newProductData.available}
                    onChange={handleInputChange}
                />

                <div className="flex justify-end gap-3 pt-4">
                    <Buttons.SecondaryButton onClick={handleClose}>
                        Cancel
                    </Buttons.SecondaryButton>

                    <Buttons.PrimaryButton
                        onClick={handleAddProduct}
                        disabled={isSubmitting || !validateForm().isValid}
                        type="submit"
                    >
                        {isSubmitting ? "Adding..." : "Add Product"}
                    </Buttons.PrimaryButton>
                </div>
            </div>
        </Modal>
    );
}

// Update Product Component
type UpdateProductProps = {
    isOpen: boolean;
    onClose: () => void;
    product: ProductType | null;
    onSuccess?: () => void;
};

export function UpdateProduct({ isOpen, onClose, product, onSuccess }: UpdateProductProps) {
    const { dispatch } = useProductContext();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productData, setProductData] = useState({
        name: product?.name || "",
        description: product?.description || "",
        category: product?.category || "",
        price: product?.price || 0,
        oldPrice: product?.oldPrice || 0,
        imageUrl: product?.imageUrl || "",
        available: product?.available ?? true
    });

    // Update form data when product prop changes
    useEffect(() => {
        if (product) {
            setProductData({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                oldPrice: product.oldPrice,
                imageUrl: product.imageUrl,
                available: product.available
            });
        }
    }, [product]);

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setProductData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 :
                type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                    value
        }));
    };

    // Validate form inputs
    const validateForm = (): { isValid: boolean; errorMessage?: string; } => {
        const { name, description, category, price, oldPrice, imageUrl } = productData;

        if (!name.trim() || !description.trim() || !category.trim() || price <= 0 || oldPrice < 0 || !imageUrl.trim()) {
            return { isValid: false, errorMessage: "Please fill in all required fields correctly." };
        }

        // Check that oldPrice is not less than price
        if (oldPrice > 0 && oldPrice < price) {
            return { isValid: false, errorMessage: "Old Price cannot be less than Price." };
        }

        return { isValid: true };
    };

    // Handle Update Product form submission
    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!product) return;

        const validation = validateForm();
        if (!validation.isValid) {
            alert(validation.errorMessage);
            return;
        }

        setIsSubmitting(true);

        try {
            const updatedProduct: ProductType = {
                ...product,
                ...productData
            };

            // Update in context (you might want to add an API call here)
            dispatch({
                type: "UPDATE_PRODUCT",
                payload: { product: updatedProduct }
            });

            alert("Product updated successfully!");
            onClose();
            onSuccess?.();
        } catch (error) {
            console.error("Error updating product:", error);
            alert("An error occurred while updating the product.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            open={isOpen}
            setClose={onClose}
        >
            <div className="w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Update Product</h2>

                <form onSubmit={handleUpdateProduct}>
                    <Forms.FormInput
                        label="Product Name *"
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        placeholder="Enter product name"
                    />

                    <Forms.TextArea
                        label="Description *"
                        name="description"
                        value={productData.description}
                        onChange={handleInputChange}
                        placeholder="Enter product description"
                        rows={3}
                    />

                    <Forms.FormInput
                        label="Category *"
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        placeholder="Enter product category"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Forms.FormInput
                            label="Price ($) *"
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />

                        <Forms.FormInput
                            label="Old Price ($)"
                            type="number"
                            name="oldPrice"
                            value={productData.oldPrice}
                            onChange={handleInputChange}
                            placeholder="0.00"
                        />
                    </div>

                    <Forms.FormInput
                        label="Image URL *"
                        type="url"
                        name="imageUrl"
                        value={productData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                    />

                    <Forms.FormCheckbox
                        label="Available for sale"
                        name="available"
                        checked={productData.available}
                        onChange={handleInputChange}
                    />

                    <div className="flex justify-end gap-3 pt-4">
                        <Buttons.SecondaryButton onClick={onClose}>
                            Cancel
                        </Buttons.SecondaryButton>

                        <Buttons.PrimaryButton
                            disabled={isSubmitting || !validateForm().isValid}
                        >
                            {isSubmitting ? "Updating..." : "Update Product"}
                        </Buttons.PrimaryButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
