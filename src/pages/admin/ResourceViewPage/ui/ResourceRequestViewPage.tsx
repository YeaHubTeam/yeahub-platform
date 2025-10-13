import { useParams } from 'react-router-dom';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestViewForm } from '@/widgets/resources/ResourceRequestView';

const ResourceRequestViewPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const { data: resource } = useGetResourceRequestByIdQuery(resourceId ?? '');

	if (!resource) return null;

	return <ResourceRequestViewForm resource={resource} />;
};

export default ResourceRequestViewPage;
