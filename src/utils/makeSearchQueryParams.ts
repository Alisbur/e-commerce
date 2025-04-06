export const makeSearchQueryParams = (searchQuery: string): Record<string, any>[] | null => {
  if(searchQuery) {
    return [
      { title: { $containsi: searchQuery } },
      { description: { $containsi: searchQuery } },
    ]
  }
  return null;
}