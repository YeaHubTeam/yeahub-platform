import React from 'react';
import { Navigate } from 'react-router-dom';

import { EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/constants/customRoutes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

import { getFullProfile } from '@/entities/profile';

interface VerifiedEmailRouteProps {
	children: React.ReactNode;
}

export const VerifiedEmailRoute = ({ children }: VerifiedEmailRouteProps) => {
	const profile = useAppSelector(getFullProfile);
	const isEmailVerified = !!profile?.isEmailVerified;

	return isEmailVerified ? <>{children}</> : <Navigate to={EMAIL_VERIFY_SETTINGS_TAB} />;
};
