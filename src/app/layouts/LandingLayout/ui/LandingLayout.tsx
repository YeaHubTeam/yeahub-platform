import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const LandingLayout = () => {
	return (
		<Suspense>
			<Outlet />
		</Suspense>
	);
};
