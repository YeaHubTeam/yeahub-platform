import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';

import { getIsVerified } from '@/entities/profile';
import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestEditForm } from '@/features/resources/editResourceRequest';

import { PageWrapper } from '@/widgets/PageWrapper';

import { RequestResourceEditPageSkeleton } from './RequestResourceEditPage.skeleton';

const RequestResourceEditPage = () => {
	const { requestId } = useParams<{ requestId: string }>();
	const navigate = useNavigate();

	const isEmailVerified = useAppSelector(getIsVerified);

	useEffect(() => {
		if (!isEmailVerified) {
			navigate(ROUTES.wiki.resources.page);
		}
	}, [isEmailVerified, navigate]);

	const { data: myResourceRequest, isLoading } = useGetResourceRequestByIdQuery(requestId || '');

	const content = myResourceRequest && <ResourceRequestEditForm request={myResourceRequest} />;
	const hasData = Boolean(myResourceRequest);

	return (
		<PageWrapper
			isLoading={isLoading}
			hasData={hasData}
			skeleton={<RequestResourceEditPageSkeleton />}
			content={content}
			stubs={{}}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default RequestResourceEditPage;
