// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getQueryStringFromSearch = (searchParams: Record<string, any>): string => {
  if (searchParams && searchParams.filters && searchParams.filters.title) {
    return searchParams.filters.title['$containsi'];
  }
  return '';
};