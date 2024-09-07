import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';

import { LS_ACCESS_TOKEN_KEY } from '@/entities/auth';

interface UnAuthRouteProps {
	children: React.ReactNode;
}

export const UnAuthRoute = ({ children }: UnAuthRouteProps) => {
	const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
	const replaceUrl = ROUTES.appRoute;

	return !isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};
