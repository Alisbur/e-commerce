import { makeSearchParams } from './makeSearchParams';

type TValue = string | string[] | number | number[] | boolean;

const PARAMS_CONVERT_RULES: Record<string, (value: TValue) => string> = {
  titleSearch: (value: TValue) => makeSearchParams({ searchConfig: { filters: { title: { $containsi: value } } } }),
  categoryIdList: (value: TValue) =>
    makeSearchParams({ searchConfig: { filters: { productCategory: { documentId: { $in: value } } } } }),
  isInStock: (value: TValue) => makeSearchParams({ searchConfig: { filters: { isInStock: { $eq: value } } } }),
  priceSortRule: (value: TValue) => makeSearchParams({ searchConfig: { sort: { price: value } } }),
  paginationPage: (value: TValue) => makeSearchParams({ searchConfig: { pagination: { page: value } } }),
  paginationItemsPerPage: (value: TValue) => makeSearchParams({ searchConfig: { pagination: { pageSize: value } } }),
};

export const convertSearchParamsToApiSearchParams = (
  params: Record<string, string | string[] | number | number[] | boolean | undefined | null>,
): string => {
  const results: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (
      !(
        (value === null && value !== undefined) ||
        (typeof value === 'string' && value.length) ||
        (Array.isArray(value) && value.length)
      )
    ) {
      results.push(PARAMS_CONVERT_RULES[key](value as TValue));
    }
  }
  return results.join('&');
};
