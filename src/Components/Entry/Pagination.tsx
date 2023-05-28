import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

export default function Pagination({
    setPageNumber,
    pageLength,
}: {
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    pageLength: number;
}) {
    const maxVisiblePages = 3; // Number of pages to show on each side of the ellipsis
    const [currentPage, setCurrentPage] = useState(1);

    const getPageNumbers = () => {
        const pageNumbers = [];

        // Add the first three pages
        for (let i = 1; i <= Math.min(pageLength, maxVisiblePages); i++) {
            pageNumbers.push(i);
        }

        // Add ellipsis if necessary
        if (currentPage > maxVisiblePages + 1) {
            pageNumbers.push('...');
        }

        // Add the middle pages
        for (
            let i = Math.max(currentPage - 1, maxVisiblePages + 1);
            i <= Math.min(currentPage + 1, pageLength);
            i++
        ) {
            pageNumbers.push(i);
        }

        // Add ellipsis if necessary
        if (currentPage + maxVisiblePages < pageLength) {
            pageNumbers.push('...');
        }

        // Add the last three pages
        for (
            let i = Math.max(
                pageLength - maxVisiblePages + 1,
                currentPage + maxVisiblePages + 1
            );
            i <= pageLength;
            i++
        ) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    const handlePageClick = (pageNumber) => {
        if (pageNumber === '...') {
            return;
        }
        setCurrentPage(pageNumber);
        setPageNumber(pageNumber);
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <span className=" hover:cursor-pointer relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                </span>
                <span className=" hover:cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                </span>
            </div>
            <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center">
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        <span
                            onClick={() => {
                                if (currentPage <= 1) {
                                    return;
                                }
                                setPageNumber((prev) => prev - 1);
                                setCurrentPage((prev) => prev - 1);
                            }}
                            className=" hover:cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <ChevronLeftIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                        {pageNumbers.map((pageNumber, index) => (
                            <span
                                key={index}
                                className={`relative inline-flex items-center px-4 py-2 -ml-px text-sm text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                                    currentPage === pageNumber
                                        ? 'font-bold bg-blue-200'
                                        : 'bg-white '
                                }`}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </span>
                        ))}
                        <span
                            onClick={() => {
                                if (currentPage >= pageLength) {
                                    return;
                                }
                                setCurrentPage((prev) => prev + 1);
                                setPageNumber((prev) => prev + 1);
                            }}
                            className=" hover:cursor-pointer relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <ChevronRightIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                            />
                        </span>
                    </nav>
                </div>
            </div>
        </div>
    );
}
