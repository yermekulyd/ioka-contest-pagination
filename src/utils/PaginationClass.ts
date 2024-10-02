class PaginationClass {
  private currentPage: number;
  private totalPages: number;

  constructor(totalPages: number) {
    this.currentPage = 1;
    this.totalPages = totalPages;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPages() {
    return this.totalPages;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPages(step: number) {
    this.currentPage = Math.min(this.currentPage + step, this.totalPages);
  }

  prevPages(step: number) {
    this.currentPage = Math.max(this.currentPage - step, 1);
  }
}

export default PaginationClass;
