export const makeSearchQueryParams = (searchQuery: string): Record<string, any>[] => {
  return searchQuery 
    ? [
      { title: { $containsi: searchQuery } },
      { description: { $containsi: searchQuery } },
    ]
    : [
      { title: {} },
      { description: {} },
    ]
}