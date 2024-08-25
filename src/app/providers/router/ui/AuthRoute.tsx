import React from 'react';
import { Navigate } from 'react-router-dom';

import { getAccessToken } from '@/shared/helpers/getAccessToken';

type Props = {
	children: React.ReactNode;
};

export const AuthRoute = ({ children }: Props) => {
	const isAuth = getAccessToken();
	const replaceUrl = '/auth/login';

	return isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};
