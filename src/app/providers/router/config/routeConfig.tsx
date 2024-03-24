import { createBrowserRouter } from 'react-router-dom';

import { BaseLayout } from '@/app/layouts/BaseLayout';

// import adminRoutes from 'admin/router'; ###uncomment when we add the another routes

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      // ...routes,  ###uncomment when we add the another routes
    ],
  },
]);
