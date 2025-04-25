export const PRODUCT_LIST_BASE_PARAMS = {
  fields: ['id', 'documentId', 'title', 'description', 'price', 'isInStock', 'discountPercent', 'rating'],
  populate: ['images', 'productCategory'],
};
