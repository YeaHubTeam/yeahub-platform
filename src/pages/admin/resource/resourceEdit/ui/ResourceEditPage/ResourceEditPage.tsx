import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { i18Namespace, Resources, ROUTES } from '@/shared/config';

import { useGetResourceByIdQuery } from '@/entities/resource';

import { ResourceEditForm } from '@/features/resources/editResource';

import { EditAccessGuard } from '@/widgets/EditAccessGuard';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const ResourceEditPage = () => {
	const { t } = useTranslation(i18Namespace.resources);
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

	const content = hasResource ? (
		<EditAccessGuard
			authorId={resource.createdBy?.id}
			redirectTo={ROUTES.admin.resources.page}
			titleStub={t(Resources.STUB_EDIT_ACCESS_TITLE)}
			subtitleStub={t(Resources.STUB_EDIT_ACCESS_SUBTITLE)}
			buttonTextStub={t(Resources.STUB_EDIT_ACCESS_SUBMIT)}
		>
			<ResourceEditForm resource={resource} />
		</EditAccessGuard>
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading || isFetching}
			hasError={isError}
			hasData={hasResource}
			stubs={stubs}
			roles={['admin', 'author']}
			content={content}
		>
			{({ content: resolvedContent }) => <>{resolvedContent}</>}
		</PageWrapper>
	);
};

export default ResourceEditPage;
