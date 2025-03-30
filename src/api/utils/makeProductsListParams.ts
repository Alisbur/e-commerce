export const makeProductsListParams = ({ productsPerPage }: { productsPerPage: number }) => ({
  fields: ['id', 'documentId', 'title', 'description', 'price', 'isInStock'],
  populate: ['images', 'productCategory'],
  pagination: {
    pageSize: productsPerPage,
  },
});
