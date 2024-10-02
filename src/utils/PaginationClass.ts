class PaginationClass {
  private currentPage: number;
  private totalPages: number;
  private isLooped: boolean;

  constructor(totalPages: number, isLooped: boolean = false) {
    this.currentPage = 1;
    this.totalPages = totalPages;
    this.isLooped = isLooped;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    } else if (this.isLooped) {
      this.currentPage = 1;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    } else if (this.isLooped) {
      this.currentPage = this.totalPages;
    }
  }

  nextPages(step: number) {
    if (this.isLooped) {
      this.currentPage = ((this.currentPage - 1 + step) % this.totalPages) + 1;
    } else {
      this.currentPage = Math.min(this.currentPage + step, this.totalPages);
    }
  }

  prevPages(step: number) {
    if (this.isLooped) {
      this.currentPage =
        ((this.currentPage - 1 - step + this.totalPages) % this.totalPages) + 1;
    } else {
      this.currentPage = Math.max(this.currentPage - step, 1);
    }
  }
}

export default PaginationClass;
