export const makeCategoriesFilterParams = (categoriesIdArray: string[]): Record<string, any> | null => {
  if(categoriesIdArray.length) {
    return {
      productCategory: {
        documentId: {
          $in: categoriesIdArray,
        },
      },
    }
  }
  return null;
}