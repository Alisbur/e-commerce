export const makeCategoriesFilterParams = (categoriesIdArray: string[]): Record<string, any>[] => {
  return categoriesIdArray.length
    ? [{productCategory: {documentId: {$in: categoriesIdArray}}}]
    : [{productCategory: {}}]
}