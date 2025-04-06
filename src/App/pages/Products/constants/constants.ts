import { TFilterOption } from 'App/pages/Products';

export const FILTER_OPTIONS: TFilterOption[] = [
  { key: 'discountPercent', value: 'Discount percent', type: 'sort', rule: {} },
  { key: 'isInStock', value: 'Available on stock', type: 'sort', rule: {} },
  { key: 'price', value: 'Price', type: 'sort', rule: {} },
  { key: 'rating', value: 'Rating', type: 'sort', rule: {} },
];
