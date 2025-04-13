import { ParsedQs } from 'qs';
import { makeSearchParams } from './makeSearchParams';

export const makeProductsListSearchParams = (
  extraParams: Record<string, string | ParsedQs | (string | ParsedQs)[] | undefined> = {},
) => {
  const searchConfig = {
    populate: ['images', 'productCategory'],
    fields: ['id', 'documentId', 'title', 'description', 'price', 'isInStock'],
    ...extraParams,
  };
  return makeSearchParams({ searchConfig });
};
