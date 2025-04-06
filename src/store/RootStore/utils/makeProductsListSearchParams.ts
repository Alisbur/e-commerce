import { makeSearchParams } from './makeSearchParams';

export const makeProductsListSearchParams = ({ productsPerPage }: { productsPerPage: number }) => {
  const searchConfig = {
    populate: ['images', 'productCategory'],
    fields: ['id', 'documentId', 'title', 'description', 'price', 'isInStock'],
    pagination: {
      pageSize: productsPerPage,
    },
  };
  return makeSearchParams({ searchConfig });
};
