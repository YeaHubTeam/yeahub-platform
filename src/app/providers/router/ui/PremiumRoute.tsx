import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getHasPremiumAccess } from '@/entities/profile';

interface PremiumRouteProps {
	children: React.ReactNode;
}

export const PremiumRoute = ({ children }: PremiumRouteProps) => {
	const hasPremium = useAppSelector(getHasPremiumAccess);
	const isProfileLoading = useAppSelector((state) => state.profile.fullProfile === null);
	const location = useLocation();

	if (isProfileLoading) {
		return null;
	}

	if (!hasPremium) {
		if (location.state?.from) {
			return <Navigate to={ROUTES.interview.page} />;
		}
		return <Navigate to={ROUTES.platformRoute} replace />;
	}

	return <>{children}</>;
};
