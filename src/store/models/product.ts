import { normalizeProductImage, TProductImageApi, TProductImageModel } from "./ProductImage";
import { normalizeProductCategory, TProductCategoryApi, TProductCategoryModel } from "./ProductCategory";
import { normalizeId, TIdApi, TIdModel } from "./id";

export type TProductApi = {
  id: number;
  documentId: string;
  title: string;
  description?: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock?: boolean;
  images?: TProductImageApi[];
  productCategory?: TProductCategoryApi;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: TIdApi;
  updatedBy?: TIdApi;
  locale?: string;
  localizations?: unknown;
};

export type TProductModel = {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  price: number;
  discountPercent: number | null;
  rating: number | null;
  isInStock: boolean | null;
  images: TProductImageModel[] | null;
  productCategory: TProductCategoryModel | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  publishedAt: Date | null;
  createdBy: TIdModel | null;
  updatedBy: TIdModel | null;
  locale: string | null;
};

export const normalizeProduct = (from: TProductApi): TProductModel => ({
  id: from.id,
  documentId: from.documentId,
  title: from.title,
  description: from.description ?? null,
  price: from.price,
  discountPercent: from.discountPercent ?? null,
  rating: from.rating ?? null,
  isInStock: from.isInStock ?? null,
  images: from.images ? from.images.map((i) => normalizeProductImage(i)) : null,
  productCategory: from.productCategory ? normalizeProductCategory(from.productCategory) : null,
  createdAt: from.createdAt ? new Date(from.createdAt) : null,
  updatedAt: from.updatedAt ? new Date(from.updatedAt) : null,
  publishedAt: from.publishedAt ? new Date(from.publishedAt) : null,
  createdBy: from.createdBy ? normalizeId(from.createdBy) : null,
  updatedBy: from.updatedBy ? normalizeId(from.updatedBy) : null,
  locale: from.locale ?? null,
})