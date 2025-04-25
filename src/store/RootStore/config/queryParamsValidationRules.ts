import { TParams } from '../types/types';

type TObjValidations<T> = {
  [key in keyof T]: (value: T[key]) => boolean;
};

export const QUERY_PARAMS_VALIDATION_RULES: TObjValidations<TParams> = {
  titleSearch: (value) => typeof value === 'string' && value.length > 0,
  categoryIdList: (value) => Array.isArray(value) && value.length > 0,
  isInStock: (value) => typeof value === 'string' && value === 'true',
  priceSort: (value) => value === 'asc' || value === 'desc',
  exceptProductIdList: (value) => Array.isArray(value) && value.length > 0,
  paginationPage: (value) => !isNaN(Number(value)) && Number(value) > 0,
  paginationLimit: (value) => !isNaN(Number(value)) && Number(value) > 0,
  paginationItemsPerPage: (value) => !isNaN(Number(value)) && Number(value) > 0,
  discountPercentSort: (value) => value === 'asc' || value === 'desc',
  ratingSort: (value) => value === 'asc' || value === 'desc',
};
