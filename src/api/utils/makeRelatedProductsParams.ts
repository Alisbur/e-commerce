export const makeRelatedProductsParams = ({
  productCategoryDocumentId,
  productDocumentId,
  quantity,
}: {
  productCategoryDocumentId: string;
  productDocumentId: string;
  quantity: number;
}) => ({
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
});
