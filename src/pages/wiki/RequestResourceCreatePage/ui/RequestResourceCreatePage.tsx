import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';

import { getIsEmailVerified } from '@/entities/profile';

import { ResourceRequestCreateForm } from '@/features/resources/createResourceRequest';

const RequestResourceCreatePage = () => {
	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsEmailVerified);

	useEffect(() => {
		if (!isEmailVerified) {
			navigate(ROUTES.wiki.resources.page);
		}
	}, [isEmailVerified, navigate]);

	return <ResourceRequestCreateForm />;
};

export default RequestResourceCreatePage;
