import { normalizeMeta, TMetaApi, TMetaModel } from './meta';
import { normalizeProduct, TProductApi, TProductModel } from './Product';

export type TProductListResponseApi = {
  data: TProductApi[];
  meta: TMetaApi;
};

export type TProductListResponseModel = {
  data: TProductModel[];
  meta: TMetaModel;
};

export const normalizeProductListResponse = (from: TProductListResponseApi): TProductListResponseModel => ({
  data: from.data.map((p) => normalizeProduct(p)),
  meta: normalizeMeta(from.meta),
});
