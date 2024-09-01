import React from 'react';
import { Navigate } from 'react-router-dom';

import { getFromLS } from '@/shared/helpers/manageLocalStorage';

import { LS_ACCESS_TOKEN_KEY } from '@/entities/auth';

type Props = {
	children: React.ReactNode;
};

export const AuthRoute = ({ children }: Props) => {
	const isAuth = getFromLS(LS_ACCESS_TOKEN_KEY);
	const replaceUrl = '/auth/login';

	return isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};