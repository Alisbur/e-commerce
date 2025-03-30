import { RouteObject } from 'react-router';
import App from 'App/App';
import Products from 'App/pages/Products';
import ProductCard from 'App/pages/ProductCard/ProductCard';
import NotFound from 'App/pages/NotFound';
import Categories from 'App/pages/Categories';
import AboutUs from 'App/pages/AboutUs';
import Cart from 'App/pages/Cart';
import Account from 'App/pages/Account';
import { routes } from './routes';

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.products.mask,
        element: <Products />,
      },
      {
        path: routes.product.mask,
        element: <ProductCard />,
      },
      {
        path: routes.categories.mask,
        element: <Categories />,
      },
      {
        path: routes.about.mask,
        element: <AboutUs />,
      },
      {
        path: routes.cart.mask,
        element: <Cart />,
      },
      {
        path: routes.account.mask,
        element: <Account />,
      },
      {
        path: routes.notFound.mask,
        element: <NotFound />,
      },
    ],
  },
];
