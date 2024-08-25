import React from 'react';
import { Navigate } from 'react-router-dom';

import { getAccessToken } from '@/shared/helpers/getAccessToken';

type Props = {
	children: React.ReactNode;
};

export const UnAuthRoute = ({ children }: Props) => {
	const isAuth = getAccessToken();
	const replaceUrl = '/';

	return !isAuth ? <>{children}</> : <Navigate to={replaceUrl} />;
};
