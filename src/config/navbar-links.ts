import { PAGE_ROUTES } from 'config/routes';

export type TNavBarLink = {
  caption: string;
  route: string;
};

export const NAVBAR_LINKS: TNavBarLink[] = [
  {
    caption: 'Products',
    route: PAGE_ROUTES.products.mask,
  },
  {
    caption: 'Categories',
    route: PAGE_ROUTES.categories.mask,
  },
  {
    caption: 'About Us',
    route: PAGE_ROUTES.about.mask,
  },
];
