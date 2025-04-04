import { normalizeId, TIdApi, TIdModel } from "./id";
import { normalizeProductImage, TProductImageApi, TProductImageModel } from "./ProductImage";

export type TProductCategoryApi = {
  id: number,
  documentId: string;
  title: string;
  image?: TProductImageApi;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: TIdApi;
  updatedBy?: TIdApi;
  locale: string;
  localizations?: unknown;
} & { [key: string]: unknown };

export type TProductCategoryModel = {
  id: number,
  documentId: string;
  title: string;
  image: TProductImageModel | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt: Date | null;
  createdBy: TIdModel | null;
  updatedBy: TIdModel | null;
  locale: string;
}

export const normalizeProductCategory = (from: TProductCategoryApi): TProductCategoryModel => ({
  id: from.id,
  documentId: from.documentId,
  title: from.title,
  image: from.image ? normalizeProductImage(from.image) : null,
  createdAt: from.createdAt ? new Date(from.createdAt) : null,
  updatedAt: from.updatedAt ? new Date(from.updatedAt) : null,
  publishedAt: from.publishedAt ? new Date(from.publishedAt) : null,
  createdBy: from.createdBy ? normalizeId(from.createdBy): null,
  updatedBy: from.updatedBy ? normalizeId(from.updatedBy): null,
  locale: from.locale,
})