import { TFilterOption } from 'App/pages/Products';

export const PRODUCTS_PER_PAGE = 9;

export const FILTER_OPTIONS: TFilterOption[] = [
  { key: 'discountPercent', value: 'Discount percent', type: 'sort' },
  { key: 'isInStock', value: 'Available on stock', type: 'sort' },
  { key: 'price', value: 'Price', type: 'sort' },
  { key: 'rating', value: 'Rating', type: 'sort' },
];
