// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryStringFromSearch = (searchParams: Record<string, any>): string => {
  return searchParams?.filters?.title?.['$containsi'] ?? '';
};
