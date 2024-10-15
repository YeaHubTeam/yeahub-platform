import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';

import { useProfileQuery } from '@/entities/auth';

interface AdminRouteProps {
	children: React.ReactNode;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
	const { data: profile } = useProfileQuery();
	const isAdmin = profile?.userRoles[0]?.name === 'admin';

	return isAdmin ? <>{children}</> : <Navigate to={ROUTES.appRoute} />;
};
