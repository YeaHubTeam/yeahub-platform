import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Resources } from '@/shared/config';

import { useGetResourceRequestByIdQuery } from '@/entities/resource';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { ResourceRequestViewForm } from '../ResourceRequestViewForm/ResourceRequestViewForm';

const ResourceRequestViewPage = () => {
	const { resourceId } = useParams<{ resourceId: string }>();

	const {
		data: resource,
		isLoading,
		isError,
		refetch,
	} = useGetResourceRequestByIdQuery(resourceId || '');

	const { t } = useTranslation(i18Namespace.resources);

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
	const hasData = !!resource && Object.keys(resource).length > 0;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			stubs={stubs}
			roles={['admin', 'author']}
			content={resource ? <ResourceRequestViewForm resource={resource} /> : null}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ResourceRequestViewPage;
