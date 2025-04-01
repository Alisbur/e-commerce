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
    mask: '/product/:documentId',
    create: (documentId: string) => `/product/${documentId}`,
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
    create: () => `/categories`,
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
