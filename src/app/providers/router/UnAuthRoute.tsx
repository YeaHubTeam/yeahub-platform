import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { getFromLS, LS_ACCESS_TOKEN_KEY } from '@/shared/libs';

interface UnAuthRouteProps {
	children: ReactNode;
}
// TODO добавить replace в Navigate
export const UnAuthRoute = ({ children }: UnAuthRouteProps) => {
	const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
	const replaceUrl = ROUTES.appRoute;

	return !isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};
