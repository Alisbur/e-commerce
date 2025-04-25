export const PAGE_ROUTES = {
  main: {
    mask: '/',
    create: () => '/',
  },
  products: {
    mask: '/',
    create: () => '/products',
  },
  product: {
    mask: '/products/:documentId',
    create: (documentId: string) => `/products/${documentId}`,
  },
  categories: {
    mask: '/categories',
    create: () => `/categories`,
  },
  about: {
    mask: '/about',
    create: () => `/about`,
  },
  cart: {
    mask: '/cart',
    create: () => `/cart`,
  },
  account: {
    mask: '/account',
    create: () => `/account`,
  },
  notFound: {
    mask: '*',
    create: () => `/`,
  },
};
