import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector, EMAIL_VERIFY_SETTINGS_TAB } from '@/shared/libs';

import { getFullProfile } from '@/entities/profile';

interface VerifiedEmailRouteProps {
	children: ReactNode;
}

export const VerifiedEmailRoute = ({ children }: VerifiedEmailRouteProps) => {
	const profile = useAppSelector(getFullProfile);
	const isEmailVerified = !!profile?.isVerified;

	return isEmailVerified ? <>{children}</> : <Navigate to={EMAIL_VERIFY_SETTINGS_TAB} />;
};
