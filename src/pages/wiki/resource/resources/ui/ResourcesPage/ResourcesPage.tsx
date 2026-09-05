import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, Marketplace, Resources, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Icon } from '@/shared/ui/Icon';

import { getIsVerified, getSpecializationId } from '@/entities/profile';
import {
	useGetMyRequestsResourcesReviewCountQuery,
	useGetResourcesListQuery,
} from '@/entities/resource';

import { ResourcesFilters, useResourcesFilters } from '@/features/resources/filterResources';

import { ListLayoutPage } from '@/widgets/ListLayoutPage';
import { ResourcesList } from '@/widgets/Marketplace';
import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { ResourcesPageSkeleton } from './ResourcesPage.skeleton';

const ResourcesPage = () => {
	const navigate = useNavigate();
	const specializationId = useSelector(getSpecializationId);
	const isEmailVerified = useAppSelector(getIsVerified);

	const {
		onChangeTitle,
		onChangeSkills,
		onChangeTypes,
		filters,
		onChangePage,
		onResetFilters,
		hasFilters,
	} = useResourcesFilters({ page: 1 });

	const {
		data: resourcesResponse,
		isLoading,
		isError,
		refetch,
	} = useGetResourcesListQuery({
		page: filters.page ?? 1,
		name: filters.title,
		specializations: specializationId,
		skills: filters.skills,
		types: filters.types,
	});
	const { data: myResourceRequestsReviewCount = 0 } = useGetMyRequestsResourcesReviewCountQuery({});

	const resources = resourcesResponse?.data ?? [];
	const hasResources = resources.length > 0;

	const { t } = useTranslation([i18Namespace.marketplace, i18Namespace.resources]);

	const handleNavigateToMyResources = () => {
		navigate(ROUTES.wiki.resources.my.page);
	};

	const renderFilters = () => (
		<ResourcesFilters
			filters={{
				skills: filters.skills,
				types: filters.types,
				title: filters.title,
			}}
			onChangeTitle={onChangeTitle}
			onChangeSkills={onChangeSkills}
			onChangeTypes={onChangeTypes}
			showSpecialization={false}
		/>
	);

	const stubs: PageWrapperStubs = {
		'filter-empty': {
			onClick: onResetFilters,
		},
		empty: {
			title: t(Resources.STUB_EMPTY_RESOURCES_TITLE, { ns: i18Namespace.resources }),
			subtitle: t(Resources.STUB_EMPTY_RESOURCES_SUBTITLE, { ns: i18Namespace.resources }),
			buttonText: t(Resources.STUB_EMPTY_RESOURCES_SUBMIT, { ns: i18Namespace.resources }),
			onClick: () => navigate(ROUTES.wiki.resources.my.create.page),
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<ResourcesPageSkeleton />}
			hasFilters={hasFilters}
			hasData={hasResources}
			hasError={isError}
			stubs={stubs}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: resourcesResponse?.limit || 0,
				total: resourcesResponse?.total || 0,
			}}
			content={<ResourcesList resources={resources} />}
		>
			{({ content, pagination }) => (
				<ListLayoutPage
					title={t(Marketplace.HEADER_TITLE)}
					filters={renderFilters()}
					isEmailVerified={isEmailVerified}
					actionButton={{
						suffix: <Icon icon="plus" />,
						onClick: () => navigate(ROUTES.wiki.resources.my.create.page),
						label: t(Marketplace.LINK_LABEL),
					}}
					pagination={pagination}
					secondaryAction={{
						count: myResourceRequestsReviewCount,
						onClick: handleNavigateToMyResources,
						label: t(Marketplace.MY_RESOURCES),
					}}
				>
					{content}
				</ListLayoutPage>
			)}
		</PageWrapper>
	);
};

export default ResourcesPage;
