import { EditIcon, DeleteIcon } from "../shared/Icons";
import type { ProductType } from "../../types/types";

type AdminProductCardProps = {
    product: ProductType;
    onClick?: (product: ProductType) => void;
    onDelete?: (productId: string) => void;
};

export default function AdminProductCard({ product, onClick, onDelete }: AdminProductCardProps) {
    const handleCardClick = () => {
        onClick?.(product);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete?.(product.id);
    };

    return (
        <div 
            className="flex flex-col group cursor-pointer transition-shadow duration-300"
            onClick={handleCardClick}
        >
            <div className="w-full h-72 bg-[#fafafa] flex justify-center items-center relative overflow-hidden">
                <img 
                    src={product.imageUrl || "/products/1.png"} 
                    alt={product.name}
                    className="w-full h-full group-hover:scale-110 object-cover transition-transform duration-500 ease-in-out"
                />

                <div className="absolute top-2 left-4 flex justify-start gap-2 w-full">
                    {
                        product.available ? (
                            <span className="px-2 py-1 rounded-full bg-[#4da495] text-white text-xs font-medium">Available</span>
                        ) : (
                            <span className="px-2 py-1 rounded-full bg-red-500 text-white text-xs font-medium">Out of Stock</span>
                        )
                    }
                </div>

                <div className="absolute inset-0 bg-black/5 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-lg hover:bg-gray-50 transition-colors">
                            <EditIcon width={14} height={14} />
                            <span className="text-xs font-medium">Edit</span>
                        </div>
                        <div 
                            className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg hover:bg-red-600 transition-colors cursor-pointer"
                            onClick={handleDeleteClick}
                        >
                            <DeleteIcon width={14} height={14} color="#FFFFFF" />
                            <span className="text-xs font-medium">Delete</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-2">
                <h3 className="font-medium transition-colors">{product.name}</h3>

                <p className="text-gray-600 text-sm mt-0.5">
                    Category: <span className="font-medium text-[#32c6ba]">{product.category}</span>
                </p>

                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{product.description}</p>

                <div className="flex items-center gap-2 mt-4">
                    <p className="text-gray-800 font-semibold">${product.price}</p>
                    {product.oldPrice > 0 && (
                        <p className="text-gray-400 line-through text-sm">${product.oldPrice}</p>
                    )}
                </div>
            </div>
        </div>
    );
}