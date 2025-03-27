import { routes } from "config/routes"

export type TNavBarLink = {
  id: number;
  caption: string;
  route: string;
}

export const NAVBAR_LINKS: TNavBarLink[] = [
  {
    id: 1,
    caption: 'Products',
    route: routes.products.mask,
  },
  {
    id: 2,
    caption: 'Categories',
    route: routes.product.mask,
  },
  {
    id: 3,
    caption: 'About Us',
    route: routes.product.mask,
  },
]