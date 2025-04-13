export const makeSearchQueryParams = (searchQuery: string): Record<string, object>[] => {
  return searchQuery ? [{ title: { $containsi: searchQuery } }] : [{ title: {} }];
};
