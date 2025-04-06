export const makePaginationParams = (pageNumber: number, itemsPerPage: number): Record<string, number>[] => {
  return [{ page: pageNumber }, { pageSize: itemsPerPage }];
};
