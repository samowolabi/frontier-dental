import { useState } from "react"
import ProductCard from "./ProductCard"
import { useProductContext } from "../../contexts/productContext"
import { LoadingSkeleton } from "../shared/LoadingSkeleton";
import FilterBar from "./FilterBar";
import { SearchIcon, FilterIcon } from "../shared/Icons";
import Pagination from "../shared/Pagination";
import SideModal from "../shared/SideModal";
import type { ProductType } from "../../types/types";

export default function ProductGrid() {
    const { productState } = useProductContext();
    const [filteredProducts, setFilteredProducts] = useState(productState.products);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [paginationData, setPaginationData] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 8,
        onPageChange: (_page: number) => {}
    });

    // Update Filtered Products and Pagination Data from FilterBar
    const handleFilterChange = (products: ProductType[], pagination: typeof paginationData) => {
        setFilteredProducts(products);
        setPaginationData(pagination);
    };

    return (
        <section className="w-full max-w-[86rem] mx-auto p-4 mt-10 lg:mt-14">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <FilterIcon width={18} height={18} />
                    <span className="font-medium">Filters</span>
                </button>
            </div>

            {/* Layout Container */}
            <div className="flex gap-8">
                {/* Desktop FilterBar - Hidden on Mobile */}
                <div className="hidden lg:block w-[20%] sticky top-4 self-start">
                    <FilterBar getFilteredAndSortedProducts={handleFilterChange} />
                </div>

                {/* Products Section */}
                <div className="w-full lg:w-[80%]">

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
                        ) : filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 lg:py-16 px-4">
                                <div className="text-gray-400 mb-4">
                                    <SearchIcon width={64} height={64} color="#9ba4ae" />
                                </div>
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                                <p className="text-gray-500 text-center max-w-md text-sm lg:text-base">
                                    We couldn't find any products matching your current filters. Try adjusting your search or clearing some filters to see more results.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
                                    {filteredProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {paginationData.totalPages > 1 && (
                                    <Pagination
                                        totalItems={paginationData.totalItems}
                                        itemsPerPage={paginationData.itemsPerPage}
                                        currentPage={paginationData.currentPage}
                                        onPageChange={paginationData.onPageChange}
                                    />
                                )}
                            </>
                        )
                    }
                </div>
            </div>

            {/* Mobile Filter Modal */}
            <SideModal
                isOpen={isFilterModalOpen}
                onClose={() => setIsFilterModalOpen(false)}
                title="Filters"
                position="left"
                size="sm"
            >
                <FilterBar getFilteredAndSortedProducts={handleFilterChange} />
            </SideModal>
        </section>
    )
}