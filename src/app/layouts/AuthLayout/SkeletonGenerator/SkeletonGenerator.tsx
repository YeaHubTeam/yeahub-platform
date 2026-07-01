import { useMatch } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { LoginPageSkeleton } from '@/pages/auth/login';

export const SkeletonGenerator = () => {
	const isLoginPage = useMatch(ROUTES.auth.login.page);

	if (isLoginPage) {
		return <LoginPageSkeleton dataTestId="LoginPageSkeleton" />;
	}

	return <Loader />;
};
