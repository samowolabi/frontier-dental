import type { ProductType } from "../../types/types";
import { BagIcon, EyeIcon, HeartIcon } from "../shared/Icons";

export default function ProductCard({ product }: { product: ProductType }) {
    return (
        <div className="flex flex-col group">
            <div className="w-full h-72 bg-[#fafafa] flex justify-center items-center relative overflow-hidden">
                <img src={product.imageUrl || "/products/1.png"} 
                    alt="Sample Product Placeholder"
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

                <div className="absolute bottom-4 lg:-bottom-12 lg:group-hover:bottom-4 duration-500 ease-in-out flex justify-center items-center gap-2">
                    <span className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow-lg">
                        <BagIcon width={20} height={20} />
                    </span>
                    <span className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow-lg">
                        <HeartIcon width={18} height={18} />
                    </span>
                    <span className="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow-lg">
                        <EyeIcon width={20} height={20} />
                    </span>
                </div>
            </div>

            <div className="mt-2">
                <h3 className="font-medium">{product.name}</h3>

                <p className="text-gray-600 text-sm mt-0.5">Category: <span className="font-medium text-[#32c6ba]">{product.category}</span></p>

                <div className="flex items-center gap-2 mt-4">
                    <p className="text-gray-800">${product.price}</p>
                    <p className="text-gray-400 line-through">${product.oldPrice}</p>
                </div>
            </div>
        </div>
    )
}