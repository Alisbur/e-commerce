export type TProductImageFormatApi = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type TProductImageFormatModel = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export const normalizeProductImageFormat = (from: TProductImageFormatApi): TProductImageFormatModel => ({
  ext: from.ext,
  url: from.url,
  hash: from.hash,
  mime: from.mime,
  name: from.name,
  path: from.path,
  size: from.size,
  width: from.width,
  height: from.height,
  sizeInBytes: from.sizeInBytes,
});
