export type TMetaApi = {
  pagination?: {
    page?: number;
    pageSize?: number;
    pageCount?: number;
    total?: number;
  };
};

export type TMetaModel = {
  pagination?: {
    page: number | null;
    pageSize: number | null;
    pageCount: number | null;
    total: number | null;
  };
};

export const normalizeMeta = (from: TMetaApi): TMetaModel => {
  return from.pagination
    ? {
        pagination: {
          page: from.pagination.page ?? null,
          pageSize: from.pagination.pageSize ?? null,
          pageCount: from.pagination.pageCount ?? null,
          total: from.pagination.total ?? null,
        },
      }
    : {};
};
