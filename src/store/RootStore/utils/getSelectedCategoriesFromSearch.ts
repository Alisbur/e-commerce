// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSelectedCategoriesFromSearch = (searchParams: Record<string, any>): string[] => {
  if (
    searchParams &&
    searchParams.filters &&
    searchParams.filters.productCategory &&
    searchParams.filters.productCategory.documentId
  ) {
    return searchParams.filters.productCategory.documentId['$in'];
  }
  return [];
};