import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { getFromLS, LS_ACCESS_TOKEN_KEY } from '@/shared/libs';

interface AuthRouteProps {
	children: ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
	const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
	const location = useLocation();
	const replaceUrl =
		ROUTES.auth.login.page + `?returnPage=${encodeURIComponent(location.pathname)}`;

	return isAuth ? <>{children}</> : <Navigate to={replaceUrl} replace={true} />;
};
