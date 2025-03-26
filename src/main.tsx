import { routesConfig } from "./config/routes";
import { createRoot } from "react-dom/client";
import "./styles/global.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";

const router = createBrowserRouter(routesConfig);

const root = createRoot(document.getElementById("root")! as HTMLDivElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);