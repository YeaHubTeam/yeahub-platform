import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import './styles/App.css';
import './styles/normalize.css';
import './styles/button-colors.css';

export const App = () => {
	return (
		<Suspense>
			<Outlet />
		</Suspense>
	);
};
