import { useMatch } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

import { LoginPageSkeleton } from '@/pages/auth/login';
import { RegistrationPageSkeleton } from '@/pages/auth/registration';

export const SkeletonGenerator = () => {
	const isLoginPage = useMatch(ROUTES.auth.login.page);
	const isRegistrationPage = useMatch(ROUTES.auth.register.page);

	if (isLoginPage) {
		return <LoginPageSkeleton dataTestId="LoginPageSkeleton" />;
	}

	if (isRegistrationPage) {
		return <RegistrationPageSkeleton dataTestId="RegistrationPageSkeleton" />;
	}

	return <Loader />;
};
