export type TParams = {
  titleSearch: string;
  categoryIdList: string[];
  exceptProductIdList: string[];
  isInStock: boolean | null;
  priceSort: 'asc' | 'desc' | null;
  paginationPage: number;
  paginationLimit: number | null;
  paginationItemsPerPage: number | null;
};
