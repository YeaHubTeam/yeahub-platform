import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/app/providers/router';
import '@/shared/index.css';

const root = document.getElementById('root');

const container = createRoot(root as HTMLElement);

container.render(<RouterProvider router={router} />);
