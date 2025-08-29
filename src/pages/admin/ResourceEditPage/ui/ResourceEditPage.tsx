import { useParams } from 'react-router-dom';

import { useGetResourceByIdQuery } from '@/entities/resource';

import { ResourceEditForm } from '@/features/resources/editResource';

const ResourceEditPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const { data: resource } = useGetResourceByIdQuery({ resourceId });

	if (!resource) return null;

	return <ResourceEditForm resource={resource} />;
};

export default ResourceEditPage;
