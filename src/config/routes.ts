export const routes = {
  main: {
    mask: "/",
    create: () => "/",
  },
  products: {
    mask: "/products",
    create: () => "/products",
  },
  product: {
    mask: "/product/:id",
    create: (id: string) => `/product/${id}`,
  },
}