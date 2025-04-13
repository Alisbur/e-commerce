import { ParsedQs } from 'qs';
import { makeSearchParams } from './makeSearchParams';

export const makeProductDetailsSearchParams = (
  extraParams: Record<string, string | ParsedQs | (string | ParsedQs)[] | undefined> = {},
) => {
  const searchConfig = {
    fields: ['id', 'title', 'description', 'price', 'isInStock'],
    populate: ['images', 'productCategory'],
    ...extraParams,
  };
  return makeSearchParams({ searchConfig });
};
