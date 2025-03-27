import { RouteObject } from "react-router";
import App from "../App";
import Products from "../App/pages/Products";
import ProductCard from "../App/pages/ProductCard/ProductCard";
import { routes } from "./routes";

export const routesConfig: RouteObject[] = [
  {
    path: routes.main.mask,
    element: <App />,
    children: [
      {
        path: routes.products.mask,
        element: <Products />
      },
      {
        path: routes.product.mask,
        element: <ProductCard />
      }
    ]
  }
];