import { TParamValue } from "../types/types";

export const QUERY_PARAMS_CONVERT_RULES: Record<string, (value: TParamValue) => object> = {
  titleSearch: (value: TParamValue) => ({ filters: { title: { $containsi: value } } }),
  categoryIdList: (value: TParamValue) => ({ filters: { productCategory: { documentId: { $in: value } } } }),
  isInStock: (value: TParamValue) => ({ filters: { isInStock: { $eq: value } } }),
  priceSort: (value: TParamValue) => ({ sort: { price: value } }),
  notProducts: (value: TParamValue) => ({ filters: { documentId: { $notIn: value } } }),
  paginationPage: (value: TParamValue) => ({ pagination: { page: value } }),
  paginationLimit: (value: TParamValue) => ({ pagination: { limit: value } }),
  paginationItemsPerPage: (value: TParamValue) => ({ pagination: { pageSize: value } }),
};