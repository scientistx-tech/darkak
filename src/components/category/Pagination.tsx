import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  itemsPerPage?: number; // Added prop for items per page
  totalItems?: number; // Added prop for total items (optional, can be derived)
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  itemsPerPage = 20,
  totalItems,
}) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const getPaginationNumbers = () => {
    const totalPageNumbers = siblingCount + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftRange = range(1, 3 + siblingCount);
      return [...leftRange, "...", totalPages];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightRange = range(totalPages - (3 + siblingCount) + 1, totalPages);
      return [firstPageIndex, "...", ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    return [];
  };

  const paginationNumbers = getPaginationNumbers();
  const totalItemCount =
    totalItems !== undefined ? totalItems : totalPages * itemsPerPage;

  return (
    <div className="flex items-center justify-between rounded-md bg-blue-50 px-16 py-4 shadow-sm">
      <div className="flex flex-grow items-center justify-center space-x-2">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`rounded-md px-3 py-2 text-blue-700 ${
            currentPage === 1
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          }`}
        >
          Prev
        </button>

        {paginationNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`dots-${index}`} className="text-gray-500">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                currentPage === page
                  ? "bg-blue-500 text-white focus:outline-none"
                  : "hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`rounded-md px-3 py-2 text-blue-700 ${
            currentPage === totalPages
              ? "cursor-not-allowed text-gray-400"
              : "hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          }`}
        >
          Next
        </button>
      </div>

      <span className="text-sm text-gray-600">
        Showing {currentPage * itemsPerPage - (itemsPerPage - 1)} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItemCount)} of{" "}
        {totalItemCount} ({totalPages} Pages)
      </span>
    </div>
  );
};

export default Pagination;
