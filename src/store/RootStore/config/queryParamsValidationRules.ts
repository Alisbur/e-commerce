import { TParamValue } from "../types/types";

export const QUERY_PARAMS_VALIDATION_RULES: Record<string, (value: TParamValue) => boolean> = {
  titleSearch: (value: TParamValue) => typeof value === 'string' && value.length > 0,
  categoryIdList: (value: TParamValue) => Array.isArray(value) && value.length > 0,
  isInStock: (value: TParamValue) => typeof value === 'boolean',
  priceSort: (value: TParamValue) => value === 'asc' || value === 'desc',
  exceptProductIdList: (value: TParamValue) => Array.isArray(value) && value.length > 0,
  paginationPage: (value: TParamValue) => typeof value === 'number' && value > 0,
  paginationLimit: (value: TParamValue) => typeof value === 'number' && value > 0,
  paginationItemsPerPage: (value: TParamValue) => typeof value === 'number' && value > 0,
};