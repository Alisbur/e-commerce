export const makePaginationParams = (pageNumber: number, itemsPerPage: number): Record<string, any>[] => {
  return [{page: pageNumber}, {pageSize: itemsPerPage}];
}