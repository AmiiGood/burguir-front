import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const CatalogPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    pageNumbers.push(1);

    if (totalPages <= maxPagesToShow) {
      for (let i = 2; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(2, 3);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push("ellipsis");
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
        pageNumbers.push("ellipsis");
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <nav className="flex justify-center mt-8 mb-4">
      <div className="flex items-center bg-gray-900/60 px-2 py-2 rounded-xl shadow-lg backdrop-blur">
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center justify-center w-10 h-10 rounded-lg mr-1 transition-all duration-300 ${
            currentPage === 1
              ? "text-gray-500 cursor-not-allowed opacity-50"
              : "text-gray-300 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-600/30"
          }`}
          aria-label="Página anterior"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex space-x-1.5 mx-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <div
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-8 text-gray-400"
                >
                  <MoreHorizontal size={16} />
                </div>
              );
            }

            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={`relative flex items-center justify-center w-9 h-9 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === page
                    ? "bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-gray-800/80 text-gray-300 hover:bg-indigo-500/90 hover:text-white hover:shadow-md"
                }`}
              >
                {currentPage === page && (
                  <span className="absolute inset-0 rounded-lg bg-indigo-400/20 animate-pulse"></span>
                )}
                <span className="relative z-10">{page}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`flex items-center justify-center w-10 h-10 rounded-lg ml-1 transition-all duration-300 ${
            currentPage === totalPages
              ? "text-gray-500 cursor-not-allowed opacity-50"
              : "text-gray-300 hover:bg-indigo-600 hover:text-white hover:shadow-md hover:shadow-indigo-600/30"
          }`}
          aria-label="Página siguiente"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
};

export default CatalogPagination;
