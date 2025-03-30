export const makeProductDetailsParams = () => ({
  fields: ['title', 'description', 'price'],
  populate: ['images', 'productCategory'],
});
