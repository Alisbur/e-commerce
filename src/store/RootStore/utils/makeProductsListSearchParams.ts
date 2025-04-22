import { makeSearchParams } from './makeSearchParams';

export const makeProductsListSearchParams = (
  // extraParams: Record<string, string | ParsedQs | (string | ParsedQs)[] | undefined> = {},
  // extraParams: Record<string, string | string[] | number | number[] | boolean> = {},
) => {
  const searchConfig = {
    populate: ['images', 'productCategory'],
    fields: ['id', 'documentId', 'title', 'description', 'price', 'isInStock'],
    // ...extraParams,
  };
  return makeSearchParams({ searchConfig });
};
