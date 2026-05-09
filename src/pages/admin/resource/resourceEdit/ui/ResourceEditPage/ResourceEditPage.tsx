import { useParams } from 'react-router-dom';

import { useGetResourceByIdQuery } from '@/entities/resource';

import { ResourceEditForm } from '@/features/resources/editResource';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const ResourceEditPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const {
		data: resource,
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useGetResourceByIdQuery({ resourceId });

	const hasResource = !!resource && Object.keys(resource).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	const content = hasResource ? <ResourceEditForm resource={resource} /> : null;

	return (
		<PageWrapper
			isLoading={isLoading || isFetching}
			hasError={isError}
			hasData={hasResource}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content }) => <>{content}</>}
		</PageWrapper>
	);
};

export default ResourceEditPage;
