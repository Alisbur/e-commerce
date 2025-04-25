import { normalizeMeta, TMetaApi, TMetaModel } from './meta';
import { normalizeProductCategory, TProductCategoryApi, TProductCategoryModel } from './productCategory';

export type TProductCategoriesResponseApi = {
  data: TProductCategoryApi[];
  meta?: TMetaApi;
};

export type TProductCategoriesResponseModel = {
  data: TProductCategoryModel[];
  meta: TMetaModel | null;
};

export const normalizeProductCategoriesResponse = (
  from: TProductCategoriesResponseApi,
): TProductCategoriesResponseModel => ({
  data: from.data.map((c) => normalizeProductCategory(c)),
  meta: from.meta ? normalizeMeta(from.meta) : null,
});
