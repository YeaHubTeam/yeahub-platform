import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsVerified } from '@/entities/profile';

import { ResourceRequestCreateForm } from '../ResourceRequestCreateForm/ResourceRequestCreateForm';

const RequestResourceCreatePage = () => {
	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsVerified);

	useEffect(() => {
		if (!isEmailVerified) {
			navigate(ROUTES.wiki.resources.page);
		}
	}, [isEmailVerified, navigate]);

	return <ResourceRequestCreateForm />;
};

export default RequestResourceCreatePage;
