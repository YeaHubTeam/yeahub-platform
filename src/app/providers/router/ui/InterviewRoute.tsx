import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { isEmptySpecialization } from '@/entities/profile';

interface InterviewRouteProps {
	children: React.ReactNode;
}

export const InterviewRoute = ({ children }: InterviewRouteProps) => {
	const isSpecializationEmpty = useAppSelector(isEmptySpecialization);
	const location = useLocation();

	if (location.pathname === ROUTES.platformRoute + '/' + ROUTES.interview.route)
		return <>{children}</>;

	return isSpecializationEmpty ? <Navigate to={ROUTES.interview.page} /> : <>{children}</>;
};
