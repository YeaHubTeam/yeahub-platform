// eslint-disable-next-line @conarti/feature-sliced/public-api
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import '@/shared/config/i18n/i18n';

import { StoreProvider, ToastOptions, SentryErrorBoundary, initSentry } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { router } from '@/app/providers/router';
import AppInitSentryUser from '@/app/providers/sentry/AppInitSentryUser';

import { Suspense } from 'react';

import { reducers } from '@/app/providers/store';
import { store } from '@/app/providers/store/config';

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
		<StoreProvider initialState={store.getState()} reducers={reducers} store={store}>
			<SentryErrorBoundary store={store}>
				<AppInitSentryUser />
				<Suspense fallback={<Loader />}>
					<RouterProvider router={router} />
				</Suspense>
			</SentryErrorBoundary>
			<Toaster toastOptions={ToastOptions} gutter={20} />
		</StoreProvider>,
	);
});
