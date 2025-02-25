import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AutoScrollToTop } from '@/shared/ui/AutoScrollToTop';

import './styles/App.css';

export const App = () => {
	return (
		<Suspense>
			<AutoScrollToTop>
				<Outlet />
			</AutoScrollToTop>
		</Suspense>
	);
};
