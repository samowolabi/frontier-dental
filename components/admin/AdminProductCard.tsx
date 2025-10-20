import type { ProductType } from "../../types/types";
import { BagIcon, EyeIcon, HeartIcon } from "../shared/Icons";

type AdminProductCardProps = {
    product: ProductType;
    onClick?: (product: ProductType) => void;
};

export default function AdminProductCard({ product, onClick }: AdminProductCardProps) {
    const handleCardClick = () => {
        onClick?.(product);
    };

    return (
        <div 
            className="flex flex-col group cursor-pointer hover:shadow-lg transition-shadow duration-300"
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

                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-lg">
                        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.09 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z" stroke="#171717" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899" stroke="#171717" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm font-medium">Edit Product</span>
                    </div>
                </div>

                <div className="absolute bottom-4 lg:-bottom-12 lg:group-hover:bottom-4 duration-500 ease-in-out flex justify-center items-center gap-2">
                    <span 
                        className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow-lg hover:bg-blue-500 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle individual action if needed
                        }}
                    >
                        <BagIcon width={20} height={20} />
                    </span>
                    <span 
                        className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle individual action if needed
                        }}
                    >
                        <HeartIcon width={18} height={18} />
                    </span>
                    <span 
                        className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow-lg hover:bg-green-500 hover:text-white transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle individual action if needed
                        }}
                    >
                        <EyeIcon width={20} height={20} />
                    </span>
                </div>
            </div>

            <div className="mt-2">
                <h3 className="font-medium group-hover:text-blue-600 transition-colors">{product.name}</h3>

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

                <div className="mt-2 text-xs text-gray-500">
                    ID: {product.id}
                </div>
            </div>
        </div>
    );
}