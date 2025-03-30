type TId = {
  id: number;
  documentId: string;
};

export type TProductImageFormat = {
  ext?: string;
  url?: string;
  hash?: string;
  mime?: string;
  name?: string;
  path?: null;
  size?: number;
  width?: number;
  height?: number;
  sizeInBytes?: number;
};

export type TProductImageFormats = {
  large?: TProductImageFormat;
  small?: TProductImageFormat;
  medium?: TProductImageFormat;
  thumbnail?: TProductImageFormat;
};

export type TProductImage = TId & {
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: TProductImageFormats;
  size?: number;
  url?: string;
  previewUrl?: string;
} & { [key: string]: unknown };

export type TProductCategory = TId & {
  title: string;
  image: TProductImage;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: TId;
  updatedBy?: TId;
  locale: string;
  localizations?: unknown;
} & { [key: string]: unknown };

export type TProduct = TId & {
  title: string;
  description?: string;
  price: number;
  discountPercent?: number;
  rating?: number;
  isInStock?: boolean;
  images?: TProductImage[];
  productCategory?: TProductCategory;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: TId;
  updatedBy?: TId;
  locale?: string;
  localizations?: unknown;
};

export type TMeta = {
  pagination: {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    total?: number;
  };
};

export type TProductListResponse = {
  data: TProduct[];
  meta: TMeta;
};

export type TProductResponse = {
  data: TProduct;
  meta?: object;
};

export type TProductCategoriesResponse = {
  data: TProductCategory[];
  meta: TMeta;
};

export type TErrorResponse = {
  data: object;
  error: {
    status: number;
    name: string;
    message: string;
    details: unknown;
  };
};
