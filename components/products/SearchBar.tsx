import { useRef, useEffect, useState } from "react"
import { useQueryState } from 'nuqs'
import { SearchIcon, CloseIcon } from "../shared/Icons"
import { useProductContext } from "../../contexts/productContext"
import { useDebounce } from "../../hooks/useDebounce"
import type { ProductType } from "../../types/types"

export type SearchBarPropsType = {
    isVisible: boolean
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    getSearchTerm?: (term: string) => void
}

export default function SearchBar({ isVisible, setIsVisible, getSearchTerm }: SearchBarPropsType) {
    const { productState, dispatch } = useProductContext();

    const [searchTerm, setSearchTerm] = useQueryState('search')

    const [suggestions, setSuggestions] = useState<ProductType[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Debounced search callback
    const handleDebouncedSearch = useDebounce((value: string) => {
        if (value.length > 1) {
            const filtered = productState.products?.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            ).slice(0, 5) || [];

            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, 300)


    // Handle Search Action
    const handleSearch = () => {
        if (inputRef.current) {
            const value = inputRef.current.value;
            valueOnChangeCallback(value)
        }
    }

    // Update search term state and notify parent if needed
    const valueOnChangeCallback = (value: string) => {
        setSearchTerm(value)
        getSearchTerm && getSearchTerm(value)
    }

    // Handle Clear Action
    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
            valueOnChangeCallback('');
            setSuggestions([]);
            setShowSuggestions(false);
            inputRef.current.focus();
        }
    }

    // Handle input change for suggestions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleDebouncedSearch(value);
    }

    // Handle suggestion click
    const handleSuggestionClick = (productName: string) => {
        if (inputRef.current) {
            // Add search query to context
            dispatch({
                type: "ADD_TO_SEARCH_QUERY",
                payload: {
                    query: productName
                }
            });

            inputRef.current.value = productName;
            valueOnChangeCallback(productName);

            setShowSuggestions(false);
            setIsVisible(false);
        }
    }

    // Handle Enter key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    // Handle Populate Search from Popular Searches
    const handlePopulateSearch = (term: string) => {
        if (inputRef.current) {
            inputRef.current.value = term
            valueOnChangeCallback(term)
        }
    }

    // Handle Clear All Search Queries
    const handleClearAllQueries = () => {
        dispatch({
            type: "CLEAR_SEARCH_QUERY"
        });
    }


    // Handle Click Outside to Close
    const handleOuterClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            setIsVisible(false)
        }
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsVisible(false)
            }
        }

        if (isVisible) {
            document.addEventListener('keydown', handleEscape)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
        }
    }, [isVisible, setIsVisible])


    // Sync input field with URL state
    useEffect(() => {
        if (inputRef.current && searchTerm !== null) {
            inputRef.current.value = searchTerm || ''
        }
    }, [searchTerm])


    // Focus input when search becomes visible
    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isVisible])




    return (
        <section
            data-testid="search-bar-container"
            className={`${isVisible ? "block" : "hidden"} fixed top-0 left-0 w-full h-screen bg-black/50 z-20`}
            onClick={handleOuterClick}
        >
            <div ref={containerRef} className="w-full flex flex-col justify-center px-4 py-10 bg-white">
                <div className="w-full max-w-[67.5rem] mx-auto">
                    <div className="flex items-center gap-4 rounded-full px-2 pr-3 border border-gray-300 bg-gray-100 focus-within:border-[#32c6ba] focus-within:bg-white duration-700">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search for products..."
                            className="w-full p-3 outline-none"
                            onKeyUp={handleKeyPress}
                            onChange={handleInputChange}
                        />

                        <div className="flex items-center gap-3">
                            {searchTerm && (
                                <button
                                    onClick={handleClear}
                                    className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    title="Clear search"
                                    type="button"
                                >
                                    <CloseIcon width={16} height={16} color="#686592" />
                                </button>
                            )}
                            <span className="cursor-pointer" onClick={handleSearch}>
                                <SearchIcon width={20} height={20} />
                            </span>
                        </div>
                    </div>

                    {/* Search Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="mt-2 bg-white rounded-lg border border-gray-200 shadow-lg max-h-60 overflow-y-auto">
                            <div className="p-2">
                                <p className="text-xs text-gray-500 px-3 py-1">Suggestions</p>
                                {suggestions.length === 0 ?
                                    <div className="px-3 py-2 text-sm text-gray-500">No suggestions found.</div>
                                    : suggestions.map((product) => (
                                        <div
                                            key={product.id}
                                            onClick={() => handleSuggestionClick(product.name)}
                                            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded"
                                        >
                                            <div className="text-sm font-medium text-gray-800 truncate">
                                                {product.name}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>

                {
                    productState.searchQueries.length > 0 ? (
                        <div className="flex justify-center items-center flex-wrap gap-4 text-sm mt-6">
                            <p className="text-center text-gray-600">Popular Searches:</p>
                            {productState.searchQueries.map((query) => (
                                <span key={query} onClick={() => handlePopulateSearch(query)} className="font-medium text-gray-800 hover:text-[#4da495] hover:underline duration-500 cursor-pointer">{(query || '').substring(0, 25)}{query.length > 25 ? "..." : ""}</span>
                            ))}
                            <button
                                onClick={handleClearAllQueries}
                                className="cursor-pointer text-xs px-3 py-1 text-red-700 hover:text-red-800 rounded-full transition-colors duration-500"
                                title="Clear all search history"
                            >
                                Clear All
                            </button>
                        </div>
                    ) : null
                }

                <div className="flex justify-end mt-6">
                    <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                        Press
                        <kbd className="px-2 py-1 bg-gray-200 rounded text-xs font-mono border border-gray-300">ESC</kbd>
                        to close
                    </span>
                </div>
            </div>
        </section>
    )
}