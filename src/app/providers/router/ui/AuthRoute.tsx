import React from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { LS_ACCESS_TOKEN_KEY } from '@/shared/constants/authConstants';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';

interface AuthRouteProps {
	children: React.ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
	const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
	const replaceUrl = ROUTES.auth.login.page;

	return isAuth ? <>{children}</> : <Navigate to={replaceUrl} replace={true} />;
};
