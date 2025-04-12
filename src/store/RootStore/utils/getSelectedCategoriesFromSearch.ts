// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getSelectedCategoriesFromSearch = (searchParams: Record<string, any>): string[] => {
  return searchParams?.filters?.productCategory?.documentId?.['$in'] ?? [];
};
