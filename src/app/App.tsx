import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import './styles/App.css';
import './styles/normalize.css';

export const App = () => {
	return (
		<Suspense>
			<Outlet />
		</Suspense>
	);
};
