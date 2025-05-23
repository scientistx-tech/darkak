// components/Pagination.tsx
"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  // Use either (total & limit) or totalPages
  total?: number;
  limit?: number;
  totalPages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onPageChange,
  total,
  limit,
  totalPages: totalPagesProp,
}) => {
  const totalPages =
    totalPagesProp ?? (total && limit ? Math.ceil(total / limit) : 0);

  if (totalPages <= 1) return null;

  const siblings = 1;

  const getPageNumbers = () => {
    const pages: (number | "dots")[] = [];
    const pageSet = new Set<number>();

    pageSet.add(1);
    pageSet.add(totalPages);

    for (
      let i = Math.max(2, currentPage - siblings);
      i <= Math.min(totalPages - 1, currentPage + siblings);
      i++
    ) {
      pageSet.add(i);
    }

    const sortedPages = Array.from(pageSet).sort((a, b) => a - b);
    let lastPage = 0;

    for (let page of sortedPages) {
      if (page - lastPage > 1) {
        pages.push("dots");
      }
      pages.push(page);
      lastPage = page;
    }

    return pages;
  };

  return (
    <div className="mt-6 flex flex-wrap justify-end gap-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
        >
          Prev
        </button>
      )}

      {getPageNumbers().map((page, idx) =>
        page === "dots" ? (
          <span key={`dots-${idx}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded px-4 py-2 text-sm font-medium ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ),
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
