import {
  normalizeProductImageFormats,
  TProductImageFormatsApi,
  TProductImageFormatsModel,
} from './productImageformats';

export type TProductImageApi = {
  id: number;
  documentId: string;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: TProductImageFormatsApi;
  size?: number;
  url?: string;
  previewUrl?: string;
};

export type TProductImageModel = {
  id: number;
  documentId: string;
  name: string | null;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: TProductImageFormatsModel | null;
  size: number | null;
  url: string | null;
  previewUrl: string | null;
};

export const normalizeProductImage = (from: TProductImageApi): TProductImageModel => ({
  id: from.id,
  documentId: from.documentId,
  name: from.name ?? null,
  alternativeText: from.alternativeText ?? null,
  caption: from.caption ?? null,
  width: from.width ?? null,
  height: from.height ?? null,
  formats: from.formats ? normalizeProductImageFormats(from.formats) : null,
  size: from.size ?? null,
  url: from.url ?? null,
  previewUrl: from.previewUrl ?? null,
});
