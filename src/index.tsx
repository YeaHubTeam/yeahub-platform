import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import '@/shared/config/i18n/i18n';

// import { ThemeProvider } from '@/features/theme/switch-theme';

import { router } from '@/app/providers/router';
import { StoreProvider } from '@/app/providers/store';

const root = document.getElementById('root');

const container = createRoot(root as HTMLElement);

container.render(
	<StoreProvider>
		{/* <ThemeProvider> */}
		<RouterProvider router={router} />
		{/* </ThemeProvider> */}
	</StoreProvider>,
);
