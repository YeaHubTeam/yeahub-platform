import { Suspense } from 'react';

import { MainLayout } from './layouts/MainLayout/MainLayout';
import './styles/App.css';
import './styles/normalize.css';

export const App = () => {
	return (
		<Suspense fallback="Loading...">
			<MainLayout />
		</Suspense>
	);
};
