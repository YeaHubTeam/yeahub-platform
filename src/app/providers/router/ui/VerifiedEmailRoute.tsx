import React from 'react';
import { Navigate } from 'react-router-dom';

import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';

import { useProfileQuery } from '@/entities/auth';

interface VerifiedEmailRouteProps {
	children: React.ReactNode;
}

export const VerifiedEmailRoute = ({ children }: VerifiedEmailRouteProps) => {
	const { data: profile } = useProfileQuery();
	const isEmailVerified = !!profile?.isEmailVerified;

	return isEmailVerified ? <>{children}</> : <Navigate to={EMAIL_VERIFY_SETTINGS_TAB} />;
};
