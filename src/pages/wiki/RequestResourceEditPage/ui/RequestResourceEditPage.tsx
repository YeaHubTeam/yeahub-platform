import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks';

import { getIsEmailVerified } from '@/entities/profile';
import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestEditForm } from '@/features/resources/editResourceRequest';

const RequestResourceEditPage = () => {
	const { requestId } = useParams<{ requestId: string }>();
	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsEmailVerified);

	useEffect(() => {
		if (!isEmailVerified) {
			navigate(ROUTES.wiki.resources.page);
		}
	}, [isEmailVerified, navigate]);

	const { data: myResourceRequest } = useGetResourceRequestByIdQuery(requestId || '');

	if (!myResourceRequest) return null;

	return <ResourceRequestEditForm request={myResourceRequest} />;
};

export default RequestResourceEditPage;
