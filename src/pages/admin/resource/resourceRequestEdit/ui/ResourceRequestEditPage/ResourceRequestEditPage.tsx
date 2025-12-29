import { useParams } from 'react-router-dom';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestEditForm } from '@/features/resources/editResourceRequest';

const ResourceRequestEditPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const { data: myResourceRequest } = useGetResourceRequestByIdQuery(resourceId || '');

	if (!myResourceRequest) return null;
	return <ResourceRequestEditForm request={myResourceRequest} />;
};

export default ResourceRequestEditPage;
