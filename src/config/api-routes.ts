const apiUrl = import.meta.env.VITE_STRAPI_BASE_URL + import.meta.env.VITE_STRAPI_BASE_API_URL;

export const API_ROUTES = {
  products: `${apiUrl}/products`,
  categories: `${apiUrl}/product-categories`,
};
