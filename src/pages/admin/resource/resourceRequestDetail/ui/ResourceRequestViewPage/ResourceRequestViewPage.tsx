import { useParams } from 'react-router-dom';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { ResourceRequestViewForm } from '../ResourceRequestViewForm/ResourceRequestViewForm';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { useTranslation } from 'react-i18next';
import { Resources } from '@/shared/config';

const ResourceRequestViewPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const {
		data: resource,
		isLoading,
		isError,
		refetch,
	} = useGetResourceRequestByIdQuery(resourceId || '');

	const { t } = useTranslation('resources');

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Resources.STUB_EMPTY_RESOURCE_REQUEST_DETAIL_TITLE),
			subtitle: t(Resources.STUB_EMPTY_RESOURCE_REQUEST_DETAIL_SUBTITLE),
			buttonText: t(Resources.STUB_EMPTY_RESOURCE_REQUEST_DETAIL_SUBMIT),
			onClick: refetch,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={!!resource}
			stubs={stubs}
			roles={['admin', 'author']}
			content={resource ? <ResourceRequestViewForm resource={resource} /> : null}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResourceRequestViewPage;
