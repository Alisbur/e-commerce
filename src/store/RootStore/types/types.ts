export type TParams = {
  titleSearch: string;
  categoryIdList: string[];
  exceptProductIdList: string[];
  isInStock: 'true' | null;
  discountPercentSort: 'asc' | 'desc' | null;
  ratingSort: 'asc' | 'desc' | null;
  priceSort: 'asc' | 'desc' | null;
  paginationPage: number;
  paginationLimit: number | null;
  paginationItemsPerPage: number | null;
};
