import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsEmptySpecialization } from '@/entities/profile';

interface InterviewRouteProps {
	children: ReactNode;
}

export const InterviewRoute = ({ children }: InterviewRouteProps) => {
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);
	const location = useLocation();

	if (location.pathname === ROUTES.platformRoute + '/' + ROUTES.interview.route)
		return <>{children}</>;

	return isSpecializationEmpty ? <Navigate to={ROUTES.interview.page} /> : <>{children}</>;
};
