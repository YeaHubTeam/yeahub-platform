import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { addRouteBreadcrumb } from './appContext';

export const SentryRouteTracker = () => {
	const location = useLocation();
	useEffect(() => {
		addRouteBreadcrumb(location.pathname);
	}, [location.pathname]);
	return null;
};
