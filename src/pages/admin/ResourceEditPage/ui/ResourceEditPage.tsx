import { useParams } from 'react-router-dom';

import { ResourceEditForm } from '@/features/resources/editResource';

const ResourceEditPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	if (!resourceId) return null;

	return <ResourceEditForm />;
};

export default ResourceEditPage;
