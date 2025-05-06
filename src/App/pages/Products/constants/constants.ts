import { TFilterOption } from '../Products';

export const PRODUCTS_PER_PAGE = 9;

export const SORT_OPTIONS: TFilterOption[] = [
  { key: 'priceAsc', value: 'Price (asc.)', paramName: 'priceSort', paramValue: 'asc' },
  { key: 'priceDesc', value: 'Price (desc.)', paramName: 'priceSort', paramValue: 'desc' },
  { key: 'ratingAsc', value: 'Rating (asc.)', paramName: 'ratingSort', paramValue: 'asc' },
  { key: 'ratingDesc', value: 'Rating (desc.)', paramName: 'ratingSort', paramValue: 'desc' },
  { key: 'discountPercentAsc', value: 'Discount percent (asc.)', paramName: 'discountPercentSort', paramValue: 'asc' },
  {
    key: 'discountPercentDesc',
    value: 'Discount percent (desc.)',
    paramName: 'discountPercentSort',
    paramValue: 'desc',
  },
  { key: 'onlyOnStock', value: 'Availability (only in Stock)', paramName: 'isInStock', paramValue: 'true' },
];
