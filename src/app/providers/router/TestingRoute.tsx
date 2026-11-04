import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsEmptySpecialization } from '@/entities/profile';

interface TestingRouteProps {
	children: ReactNode;
}

export const TestingRoute = ({ children }: TestingRouteProps) => {
	const isSpecializationEmpty = useAppSelector(getIsEmptySpecialization);
	const location = useLocation();

	if (location.pathname === ROUTES.testing.page) return <>{children}</>;

	return isSpecializationEmpty ? <Navigate to={ROUTES.testing.page} /> : <>{children}</>;
};
