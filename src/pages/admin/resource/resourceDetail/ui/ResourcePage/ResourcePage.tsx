import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAppSelector, useScreenSize } from '@/shared/libs';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { BackHeader } from '@/shared/ui/BackHeader';
import { DeleteResourceButton } from '@/features/resources/deleteResource';
import { ResourceEditButton } from '@/features/resources/editResource';
import { ResourcePageSkeleton } from './ResourcePage.skeleton';
import { useGetResourceByIdQuery, isResourceDisabled } from '@/entities/resource';
import { getIsAuthor, getUserId } from '@/entities/profile';
import { ResourcePageContent } from '../RecourcePageContent/ResourcePageContent';
import { Resources, ROUTES } from '@/shared/config';
import { useTranslation } from 'react-i18next';

export const ResourcePage = () => {
	const { isMobile, isTablet } = useScreenSize();
	const { resourceId } = useParams<{ resourceId: string }>();
	const navigate = useNavigate();
	const { t } = useTranslation('resources');

	const isAuthor = useSelector(getIsAuthor);
	const userId = useAppSelector(getUserId);

	const {
		data: resource,
		isLoading,
		isFetching,
		isError,
		refetch,
	} = useGetResourceByIdQuery({ resourceId });

	const hasData = !!resource && Object.keys(resource).length > 0;

	const isDisabled = resource
		? isResourceDisabled({ isAuthor, userId, createdById: resource.createdBy.id })
		: true;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(Resources.STUB_EMPTY_RESOURCE_DETAIL_TITLE),
			subtitle: t(Resources.STUB_EMPTY_RESOURCE_DETAIL_SUBTITLE),
			buttonText: t(Resources.STUB_EMPTY_RESOURCE_DETAIL_SUBMIT),
			onClick: () => navigate(ROUTES.admin.resources.details.page),
		},
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
			skeleton={<ResourcePageSkeleton />}
			content={
				hasData && (
					<ResourcePageContent
						resource={resource}
						isDisabled={isDisabled}
						isMobile={isMobile}
						isTablet={isTablet}
					/>
				)
			}
		>
			{({ content }) => (
				<>
					<BackHeader>
						{resource && (
							<>
								<DeleteResourceButton resourceId={resource.id} isDetailPage disabled={isDisabled} />
								<ResourceEditButton resourceId={resource.id} isDisabled={isDisabled} />
							</>
						)}
					</BackHeader>
					{content}
				</>
			)}
		</PageWrapper>
	);
};
