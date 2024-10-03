import React, { useEffect, useRef, useState } from "react";
import usePagination from "../hooks/usePagination";
import "../styles/Pagination.scss";

interface PaginationProps {
  totalPages: number;
  step?: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  step = 3,
  onPageChange,
}) => {
  const { currentPage, goToPage, nextPage, prevPage, nextPages, prevPages } =
    usePagination({ totalPages });

  const activeButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange]);

  const getPageNumbers = () => {
    const totalNumbers = 5;
    const halfTotalNumbers = Math.floor(totalNumbers / 2);

    let pages: (number | string)[] = [];

    pages.push(1);

    if (totalPages <= totalNumbers + 2) {
      // Display all pages if not sufficient
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= halfTotalNumbers + 1) {
        // At the start
        for (let i = 2; i <= totalNumbers; i++) {
          pages.push(i);
        }
        pages.push("nextEllipsis");
      } else if (currentPage >= totalPages - halfTotalNumbers) {
        // At the end
        pages.push("prevEllipsis");
        for (let i = totalPages - totalNumbers + 1; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("prevEllipsis");
        const startPage = currentPage - Math.floor((totalNumbers - 3) / 2);
        const endPage = currentPage + Math.floor((totalNumbers - 3) / 2);

        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        pages.push("nextEllipsis");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  if (isMobile) {
    // Adaptive layout for mobile devices
    return (
      <div className="pagination pagination--mobile">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination__button"
          aria-label="Previous page"
        >
          Previous
        </button>
        <span className="pagination__info">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination__button"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <ul className="pagination">
      {/* Button "Go back a few pages" */}
      <li>
        <button
          onClick={() => prevPages(step)}
          disabled={currentPage === 1}
          className="pagination__button"
          aria-label="Previous pages"
        >
          &#171;
        </button>
      </li>

      {/* Button "Previous page" */}
      <li>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pagination__button"
          aria-label="Previous page"
        >
          &#8249;
        </button>
      </li>

      {/* The list itself mapping our pages */}
      {pages.map((page, index) => {
        if (page === "prevEllipsis" || page === "nextEllipsis") {
          return (
            <li key={`ellipsis-${index}`}>
              <span className="pagination__ellipsis">...</span>
            </li>
          );
        }

        return (
          <li key={page}>
            <button
              onClick={() => goToPage(Number(page))}
              className={`pagination__page ${
                currentPage === page ? "active" : ""
              }`}
              aria-current={currentPage === page ? "page" : undefined}
              ref={currentPage === page ? activeButtonRef : null}
            >
              {page}
            </button>
          </li>
        );
      })}

      {/* Button "Next page" */}
      <li>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="pagination__button"
          aria-label="Next page"
        >
          &#8250;
        </button>
      </li>

      {/* Button "Skip ahead a few pages" */}
      <li>
        <button
          onClick={() => nextPages(step)}
          disabled={currentPage === totalPages}
          className="pagination__button"
          aria-label="Next pages"
        >
          &#187;
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
