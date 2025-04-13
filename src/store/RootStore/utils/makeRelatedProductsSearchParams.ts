import { ParsedQs } from 'qs';
import { makeSearchParams } from './makeSearchParams';

export const makeRelatedProductsSearchParams = (
  productCategoryDocumentId: string,
  productDocumentId: string,
  quantity: number,
  extraParams: Record<string, string | ParsedQs | (string | ParsedQs)[] | undefined> = {},
) => {
  const searchConfig = {
    fields: ['id', 'title', 'description', 'price', 'isInStock'],
    populate: ['images', 'productCategory'],
    pagination: {
      limit: quantity,
    },
    filters: {
      productCategory: {
        documentId: {
          $eq: productCategoryDocumentId,
        },
      },
      documentId: {
        $ne: productDocumentId,
      },
    },
    ...extraParams,
  };

  return makeSearchParams({ searchConfig });
};
