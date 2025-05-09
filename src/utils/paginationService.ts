export interface PaginationResponse<T> {
  data: T[];
  hasMore: boolean;
}

export class PaginationService<T> {
  private currentPage: number = 0;
  private hasMore: boolean = true;
  private fetchData: () => Promise<PaginationResponse<T>>;

  constructor(fetchData: () => Promise<PaginationResponse<T>>) {
    this.fetchData = fetchData;
  }

  async fetchNextPage(): Promise<T[]> {
    if (!this.hasMore) {
      return [];
    }

    const response = await this.fetchData();
    this.currentPage++;
    this.hasMore = response.hasMore;
    return response.data;
  }

  hasMoreData(): boolean {
    return this.hasMore;
  }

  reset(): void {
    this.currentPage = 0;
    this.hasMore = true;
  }
}
