import { RouteObject } from 'react-router';
import App from 'App/App';
import Products from 'App/pages/Products';
import ProductCard from 'App/pages/ProductCard/ProductCard';
import NotFound from 'App/pages/NotFound';
import Categories from 'App/pages/Categories';
import AboutUs from 'App/pages/AboutUs';
import Cart from 'App/pages/Cart';
import Account from 'App/pages/Account';
import { PAGE_ROUTES } from './routes';

export const routesConfig: RouteObject[] = [
  {
    path: PAGE_ROUTES.main.mask,
    element: <App />,
    children: [
      {
        path: PAGE_ROUTES.products.mask,
        element: <Products />,
      },
      {
        path: PAGE_ROUTES.product.mask,
        element: <ProductCard />,
      },
      {
        path: PAGE_ROUTES.categories.mask,
        element: <Categories />,
      },
      {
        path: PAGE_ROUTES.about.mask,
        element: <AboutUs />,
      },
      {
        path: PAGE_ROUTES.cart.mask,
        element: <Cart />,
      },
      {
        path: PAGE_ROUTES.account.mask,
        element: <Account />,
      },
      {
        path: PAGE_ROUTES.notFound.mask,
        element: <NotFound />,
      },
    ],
  },
];
