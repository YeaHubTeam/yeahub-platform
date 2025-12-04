import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export type Project = 'admin' | 'platform' | 'landing';

export const useCurrentProject = (): Project => {
	const location = useLocation();

	const project: Project = useMemo(() => {
		if (location.pathname.includes('admin')) {
			return 'admin';
		}

		if (location.pathname.includes('dashboard')) {
			return 'platform';
		}

		return 'landing';
	}, [location]);

	return project;
};
