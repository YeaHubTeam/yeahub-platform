import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';

import { useProfileQuery } from '@/entities/auth';

interface InterviewRouteProps {
	children: React.ReactNode;
}

export const InterviewRoute = ({ children }: InterviewRouteProps) => {
	const { data: profile } = useProfileQuery();
	const location = useLocation();

	if (location.pathname === '/' + ROUTES.interview.route) return <>{children}</>;

	return profile?.profiles?.[0]?.specializationId === 0 ? (
		<Navigate to={ROUTES.interview.page} />
	) : (
		<>{children}</>
	);
};
