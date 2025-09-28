import { useParams } from 'react-router-dom';

import { useGetResourceByIdQuery } from '@/entities/resource';

import { ResourceViewForm } from '@/features/resources/viewResource';

const ResourceViewPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const { data: resource } = useGetResourceByIdQuery({ resourceId });

	if (!resource) return null;

	return <ResourceViewForm resource={resource} />;
};

export default ResourceViewPage;
