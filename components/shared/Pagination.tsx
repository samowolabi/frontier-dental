type PaginationProps = {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
};

export default function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
    const pages = Math.ceil(totalItems / itemsPerPage);
    
    // Don't show pagination if there's only one page or no items
    if (pages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) {
            const newPage = currentPage - 1;
            onPageChange(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNext = () => {
        if (currentPage < pages) {
            const newPage = currentPage + 1;
            onPageChange(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbers = 7; // Maximum page numbers to display

        if (pages <= maxPageNumbers) {
            // Display all page numbers if there are fewer than 7 pages
            for (let i = 1; i <= pages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Display a truncated pagination with '...' when there are more than 7 pages
            const leftBound = Math.max(1, currentPage - 2);
            const rightBound = Math.min(pages, currentPage + 2);

            if (currentPage - 1 > 2) {
                pageNumbers.push(1, '...');
            }

            for (let i = leftBound; i <= rightBound; i++) {
                pageNumbers.push(i);
            }

            if (pages - currentPage > 2) {
                pageNumbers.push('...', pages);
            }
        }

        return pageNumbers.map((page, index) => (
            <div
                key={index}
                onClick={() => {
                    if (typeof page === 'number') {
                        onPageChange(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }}
                className={`cursor-pointer flex justify-center items-center w-[45px] h-[45px] rounded-md ${typeof page === 'number'
                    ? page === currentPage
                        ? 'font-semibold text-[#2d2c2c]'
                        : 'text-[#8a8a8a]'
                    : 'text-[#272363]'
                    }`}
            >
                {page}
            </div>
        ));
    };

    return (
        <div className="flex flex-wrap gap-x-1">
            <div
                onClick={handlePrev}
                className={`${currentPage === 1 ? 'opacity-20 ' : 'opacity-100 '} cursor-pointer flex justify-center items-center w-[43px] h-[43px] border-[1.7px] border-[#4b4b4b] rounded-md`}
            >
                <svg width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3.33334L5.33333 8L10 12.6667" stroke="#525252" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            {renderPageNumbers()}
            <div
                onClick={handleNext}
                className={`${currentPage === pages ? 'opacity-20 ' : 'opacity-100 '} cursor-pointer flex justify-center items-center w-[43px] h-[43px] border-[1.7px] border-[#525252] rounded-md`}
            >
                <svg width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 3.33334L10.6667 8L6 12.6667" stroke="#525252" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
        </div>
    );
}