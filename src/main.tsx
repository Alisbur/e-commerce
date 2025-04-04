import { routesConfig } from 'config/routesConfig';
import { createRoot } from 'react-dom/client';
import 'styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { StrictMode } from 'react';
import '../configureMobX';

const router = createBrowserRouter(routesConfig);

const root = createRoot(document.getElementById('root')! as HTMLDivElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
