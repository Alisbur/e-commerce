import { makeSearchParams } from 'utils/makeSearchParams';

export const makeProductDetailsSearchParams = () => {
  const searchConfig = {
    fields: ['title', 'description', 'price'],
    populate: ['images', 'productCategory'],
  };

  return makeSearchParams({ searchConfig });
};
