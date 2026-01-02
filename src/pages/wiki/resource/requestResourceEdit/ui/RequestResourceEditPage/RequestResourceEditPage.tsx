import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsVerified } from '@/entities/profile';
import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestEditForm } from '@/features/resource/editResourceRequest';

const RequestResourceEditPage = () => {
	const { requestId } = useParams<{ requestId: string }>();
	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsVerified);

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
