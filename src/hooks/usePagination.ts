import { useState } from "react";
import PaginationClass from "../utils/PaginationClass";

interface UsePaginationProps {
  totalPages: number;
}

const usePagination = ({ totalPages }: UsePaginationProps) => {
  const [pagination] = useState(new PaginationClass(totalPages));
  const [currentPage, setCurrentPage] = useState(pagination.getCurrentPage());

  const updatePage = () => setCurrentPage(pagination.getCurrentPage());

  const goToPage = (page: number) => {
    pagination.goToPage(page);
    updatePage();
  };

  const nextPage = () => {
    pagination.nextPage();
    updatePage();
  };

  const prevPage = () => {
    pagination.prevPage();
    updatePage();
  };

  const nextPages = (step: number) => {
    pagination.nextPages(step);
    updatePage();
  };

  const prevPages = (step: number) => {
    pagination.prevPages(step);
    updatePage();
  };

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    nextPages,
    prevPages,
  };
};

export default usePagination;
