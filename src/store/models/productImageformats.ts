import { TProductImageFormatApi, TProductImageFormatModel } from "./ProductImageFormat";

export type TProductImageFormatsApi = {
  large?: TProductImageFormatApi;
  small?: TProductImageFormatApi;
  medium?: TProductImageFormatApi;
  thumbnail?: TProductImageFormatApi;
};

export type TProductImageFormatsModel = {
  large: TProductImageFormatModel | null;
  small: TProductImageFormatModel | null;
  medium: TProductImageFormatModel | null;
  thumbnail: TProductImageFormatModel | null;
};

export const normalizeProductImageFormats = (from: TProductImageFormatsApi): TProductImageFormatsModel => ({
  large: from.large ?? null,
  small: from.small ?? null,
  medium: from.medium ?? null,
  thumbnail: from.thumbnail ?? null,
})