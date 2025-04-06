import { makeSearchParams } from "./makeSearchParams";

export const makeRelatedProductsSearchParams = ({
  productCategoryDocumentId,
  productDocumentId,
  quantity,
}: {
  productCategoryDocumentId: string;
  productDocumentId: string;
  quantity: number;
}) => {
  const searchConfig = {
    fields: ['id', 'title', 'description', 'price'],
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
  };

  return makeSearchParams({ searchConfig });
};
