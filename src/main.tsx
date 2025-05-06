import { routesConfig } from 'config/routesConfig';
import { createRoot } from 'react-dom/client';
import 'styles/index.scss';
import { RouterProvider, createHashRouter } from 'react-router';
import 'store/config/configureMobX';

const router = createHashRouter(routesConfig);

const root = createRoot(document.getElementById('root')! as HTMLDivElement);

root.render(<RouterProvider router={router} />);
