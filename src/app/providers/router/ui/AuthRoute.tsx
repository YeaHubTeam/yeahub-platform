import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

export const AuthRoute = ({ children }: Props) => {
	const isAuth = localStorage.getItem('accessToken');
	const replaceUrl = '/auth/login';
	// return children;
	return isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};
