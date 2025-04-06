import { TFilterOption } from 'App/pages/Products';
import { TProductCategoryModel } from 'store/models';

export const convertCategoryToFilterOption = (category: TProductCategoryModel): TFilterOption => ({
  key: category.documentId,
  value: category.title,
  type: 'category',
  rule: {},
});
