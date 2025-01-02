import React from 'react';
import Icon from "@/Components/Icon/Icon.jsx";

const Pagination = ({ currentPage, lastPage, onPageChange }) => {
    // Helper function to generate page numbers (only 5 at a time)
    const generatePageNumbers = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 2); // Start from 2 pages before current
        const endPage = Math.min(lastPage, currentPage + 2); // End at 2 pages after current

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    return (
        <div dir="ltr" className="flex items-center justify-center mt-4 space-x-2">
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`btn btn-primary px-2 rounded-md ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <Icon name="prev"/>
            </button>

            {/* Page Numbers */}
            {generatePageNumbers().map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-4 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                            ? "bg-blue-700 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    {page}
                </button>
            ))}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className={`btn btn-primary px-2 rounded-md ${
                    currentPage === lastPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                <Icon name="next"/>
            </button>
        </div>
    );
};

export default Pagination;
