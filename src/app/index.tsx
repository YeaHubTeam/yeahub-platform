// eslint-disable-next-line @conarti/feature-sliced/public-api
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import '@/shared/config/i18n/i18n';

import { ToastOptions } from '@/shared/config/reactHotToast';
import { initSentry } from '@/shared/config/sentry/sentry';

import { router } from '@/app/providers/router';
import { StoreProvider } from '@/app/providers/store';

const root = document.getElementById('root');

const container = createRoot(root as HTMLElement);

async function deferRender() {
	if (process.env.NODE_ENV != 'development') {
		return;
	}

	// const { worker } = await import('./msw/browser');
	// return worker.start();
}

initSentry();

deferRender().then(() => {
	container.render(
		<StoreProvider>
			<RouterProvider router={router} />
			<Toaster toastOptions={ToastOptions} gutter={20} />
		</StoreProvider>,
	);
});
