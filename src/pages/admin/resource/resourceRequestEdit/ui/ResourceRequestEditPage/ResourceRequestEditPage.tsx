import { useParams } from 'react-router-dom';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestEditForm } from '@/features/resources/editResourceRequest';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const ResourceRequestEditPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const {
		data: myResourceRequest,
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useGetResourceRequestByIdQuery(resourceId || '');

	const hasData = !!myResourceRequest && Object.keys(myResourceRequest).length > 0;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};
	return (
		<PageWrapper
			isLoading={isLoading || isFetching}
			hasError={isError}
			hasData={hasData}
			stubs={stubs}
			roles={['admin', 'author']}
			content={myResourceRequest ? <ResourceRequestEditForm request={myResourceRequest} /> : null}
		>
			{({ content }) => <>{content}</>}
		</PageWrapper>
	);
};

export default ResourceRequestEditPage;
