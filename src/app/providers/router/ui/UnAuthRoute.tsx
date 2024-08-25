import React from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

export const UnAuthRoute = ({ children }: Props) => {
	const isAuth = localStorage.getItem('accessToken');
	const replaceUrl = '/';

	return !isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};
