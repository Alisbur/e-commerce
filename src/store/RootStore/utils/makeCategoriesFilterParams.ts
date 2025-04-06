export const makeCategoriesFilterParams = (categoriesIdArray: string[]): Record<string, object>[] => {
  return categoriesIdArray.length
    ? [{ productCategory: { documentId: { $in: categoriesIdArray } } }]
    : [{ productCategory: {} }];
};
