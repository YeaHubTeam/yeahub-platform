import { useParams } from 'react-router-dom';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceEditFormAll } from '@/features/resources/editResourceRequest';

const RequestResourceEditPage = () => {
	const { requestId } = useParams<{ requestId: string }>();

	const { data: myResourceRequest } = useGetResourceRequestByIdQuery(requestId || '');

	if (!myResourceRequest) return null;

	return <ResourceEditFormAll request={myResourceRequest} />;
};

export default RequestResourceEditPage;
