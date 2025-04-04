import { normalizeMeta, TMetaApi, TMetaModel } from "./meta";
import { normalizeProduct, TProductApi, TProductModel } from "./Product";

export type TProductResponseApi = {
  data: TProductApi;
  meta?: TMetaApi;
};

export type TProductResponseModel = {
  data: TProductModel;
  meta: TMetaModel | null;
};

export const normalizeProductResponse = (from: TProductResponseApi): TProductResponseModel => ({
  data: normalizeProduct(from.data),
  meta: from.meta ? normalizeMeta(from.meta) : null,  
})