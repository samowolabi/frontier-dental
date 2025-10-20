import { useProductContext } from '../../contexts/productContext'
import { useQueryState } from 'nuqs'
import { LoadingSkeleton } from '../shared/LoadingSkeleton';
import type { ProductType } from '../../types/types';
import { useEffect } from 'react';
import { FilterIcon } from '../shared/Icons';

type FilterBarProps = {
    getFilteredAndSortedProducts: (products: ProductType[], paginationData: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        onPageChange: (page: number) => void;
    }) => void
}

export default function FilterBar({ getFilteredAndSortedProducts }: FilterBarProps) {
    const { productState } = useProductContext();

    const [searchQuery, setSearchQuery] = useQueryState('search')
    const [availability, setAvailability] = useQueryState('availability')
    const [selectedCategories, setSelectedCategories] = useQueryState('categories')
    const [sortBy, setSortBy] = useQueryState('sort')
    const [currentPage, setCurrentPage] = useQueryState('page', {
        defaultValue: 1,
        parse: (value) => parseInt(value) || 1,
        serialize: (value) => value.toString()
    })

    const itemsPerPage = 8; // Items per page for pagination


    // Handle availability filter changes
    const handleAvailabilityChange = (type: 'inStock' | 'outOfStock', checked: boolean) => {
        const currentAvailability = availability ? availability.split(',') : []
        if (checked) {
            setAvailability([...currentAvailability, type].join(','))
        } else {
            setAvailability(currentAvailability.filter(item => item !== type).join(','))
        }
    }

    // Handle category filter changes
    const handleCategoryChange = (category: string, checked: boolean) => {
        const currentCategories = selectedCategories ? selectedCategories.split(',') : []
        if (checked) {
            setSelectedCategories([...currentCategories, category].join(','))
        } else {
            setSelectedCategories(currentCategories.filter(cat => cat !== category).join(','))
        }
    }

    // Handle sort changes
    const handleSortChange = (value: string) => {
        setSortBy(value)
    }

    // Get unique categories from products
    const categories = Array.from(new Set(productState.products.map(product => product.category)));

    // Filter products based on search query, availability and categories and sort
    const getFilteredAndSortedProductsFn = (): ProductType[] => {
        let filteredProducts = [...productState.products];

        // Filter by search query
        if (searchQuery && searchQuery.trim()) {
            filteredProducts = filteredProducts.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by availability
        if (availability) {
            const availabilityFilters = availability.split(',');
            filteredProducts = filteredProducts.filter(product => {
                if (availabilityFilters.includes('inStock') && product.available) return true;
                if (availabilityFilters.includes('outOfStock') && !product.available) return true;
                return false;
            });
        }

        // Filter by categories
        if (selectedCategories) {
            const categoryFilters = selectedCategories.split(',');
            filteredProducts = filteredProducts.filter(product => categoryFilters.includes(product.category));
        }

        // Sort products
        if (sortBy) {
            switch (sortBy) {
                case 'alphabetical-az':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'alphabetical-za':
                    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                case 'price-low-high':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high-low':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }
        }

        return filteredProducts;
    }

    // Handle pagination logic
    const getPaginatedProductsAndData = () => {
        const allFilteredProducts = getFilteredAndSortedProductsFn();
        const totalItems = allFilteredProducts.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        // Reset to page 1 if current page is beyond available pages
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
            return; // Early return, will trigger useEffect again with page 1
        }

        // Calculate paginated products
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedProducts = allFilteredProducts.slice(startIndex, endIndex);

        const paginationData = {
            currentPage,
            totalPages,
            totalItems,
            itemsPerPage,
            onPageChange: setCurrentPage
        };

        return { paginatedProducts, paginationData };
    };

    // Update filtered and sorted products whenever filters, search, or sort change
    useEffect(() => {
        const result = getPaginatedProductsAndData();
        if (result) {
            getFilteredAndSortedProducts(result.paginatedProducts, result.paginationData);
        }
    }, [availability, selectedCategories, sortBy, searchQuery, currentPage, productState.products]);


    // Handle clear all filters
    const handleClearAll = () => {
        setSortBy(null)
        setAvailability(null)
        setSelectedCategories(null)
        setSearchQuery(null)
        setCurrentPage(1) // Reset page to 1
    }


    return (
        <>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center gap-2'>
                    <FilterIcon width={18.75} height={18.75} color="#171717" />
                    <h2 className="text-xl font-semibold tracking-tight">Filters</h2>
                </div>

                <button onClick={handleClearAll} className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors">
                    Reset
                </button>
            </div>

            <div className="mt-10">
                <h4 className="font-medium tracking-tight text-xl mb-2">Availability</h4>

                <div className="flex flex-col gap-3 mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={availability ? availability.split(',').includes('inStock') : false}
                            onChange={(e) => handleAvailabilityChange('inStock', e.target.checked)}
                        />
                        <span>In Stock ({productState.products.filter(product => product.available).length})</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={availability ? availability.split(',').includes('outOfStock') : false}
                            onChange={(e) => handleAvailabilityChange('outOfStock', e.target.checked)}
                        />
                        <span>Out of Stock ({productState.products.filter(product => !product.available).length})</span>
                    </label>
                </div>
            </div>

            <div className="mt-10">
                <h4 className="font-medium tracking-tight text-xl mb-2">Categories</h4>

                <div className="flex flex-col gap-3 mt-4">
                    {
                        productState.loading ? (
                            <LoadingSkeleton height={23} count={3} className="mb-2" />
                        ) : categories.map((category) => (
                            <label key={category} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4"
                                    checked={selectedCategories ? selectedCategories.split(',').includes(category) : false}
                                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                                />
                                <span>{category}</span>
                            </label>
                        ))
                    }
                </div>
            </div>

            <div className="mt-10">
                <h4 className="font-medium tracking-tight text-xl mb-2">Sort by</h4>

                <div className="flex flex-col gap-3 mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sortBy"
                            value="alphabetical-az"
                            checked={(sortBy || 'alphabetical-az') === 'alphabetical-az'}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-4 h-4"
                        />
                        <span>Alphabetical - A - Z</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sortBy"
                            value="alphabetical-za"
                            checked={(sortBy || 'alphabetical-az') === 'alphabetical-za'}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-4 h-4"
                        />
                        <span>Alphabetical - Z - A</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sortBy"
                            value="price-low-high"
                            checked={(sortBy || 'alphabetical-az') === 'price-low-high'}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-4 h-4"
                        />
                        <span>Price Low - High</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="sortBy"
                            value="price-high-low"
                            checked={(sortBy || 'alphabetical-az') === 'price-high-low'}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="w-4 h-4"
                        />
                        <span>Price High - Low</span>
                    </label>
                </div>
            </div>
        </>
    )
}