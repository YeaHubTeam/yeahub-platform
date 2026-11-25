import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import { listAdminRoles } from '@/entities/auth';
import { getUserId } from '@/entities/profile';
import { useGetResourcesListQuery } from '@/entities/resource';

import { useResourcesFilters } from '@/features/resources/filterResources';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { ResourcesAdminTable } from '../ResourcesAdminTable/RecourcesAdminTable';
import { ResourcesAdminTabs } from '../ResourcesAdminTabs/ResourcesAdminTabs';
import { ResourcesAdminToolbar } from '../ResourcesAdminToolbar/RecourcesAdminToolbar';

import { ResourcesAdminPageSkeleton } from './ResourcesAdminPage.skeleton';

export const ResourcesAdminPage = () => {
	const { t } = useTranslation(i18Namespace.resources);
	const navigate = useNavigate();
	const handleCreateResource = () => {
		navigate(ROUTES.admin.resources.create.page);
	};
	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeTitle,
		onResetFilters,
		onChangeSpecialization,
		onChangeSkills,
		onChangeTypes,
		onChangeAuthorId,
		onChangeIsMy,
		hasDrawerFilters,
	} = useResourcesFilters({
		page: 1,
	});
	const userId = useAppSelector(getUserId);
	const { data, isLoading, isError, refetch } = useGetResourcesListQuery({
		page: filters.page || 1,
		limit: 10,
		name: filters.title,
		specializations: filters.specialization,
		skills: filters.skills,
		types: filters.types,
		authorId: filters.isMy ? userId : filters.authorId,
	});
	const resources = data?.data || [];

	const stubs: PageWrapperStubs = {
		empty: {
			title: t('stub.empty.resources.title'),
			subtitle: t('stub.empty.resources.subtitle'),
			buttonText: t('stub.empty.resources.submit'),
			onClick: handleCreateResource,
		},
		error: {
			title: t('stub.error.title'),
			buttonText: t('stub.error.submit'),
			onClick: refetch,
		},
		'filter-empty': {
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			roles={listAdminRoles}
			hasData={resources.length > 0}
			isLoading={isLoading}
			hasError={isError}
			hasFilters={hasFilters}
			stubs={stubs}
			skeleton={<ResourcesAdminPageSkeleton />}
			content={<ResourcesAdminTable resources={resources} />}
			paginationOptions={{
				page: filters.page || 1,
				onChangePage,
				limit: data?.limit || 10,
				total: data?.total || 0,
			}}
		>
			{({ content, pagination }) => (
				<>
					<ResourcesAdminTabs />
					<ResourcesAdminToolbar
						searchValue={filters.title}
						onSearch={onChangeTitle}
						onResetFilters={onResetFilters}
						hasFilters={hasFilters}
						filters={filters}
						hasDrawerFilters={hasDrawerFilters}
						onChangeSpecialization={onChangeSpecialization}
						onChangeSkills={onChangeSkills}
						onChangeTypes={onChangeTypes}
						onChangeAuthorId={onChangeAuthorId}
						onChangeIsMy={onChangeIsMy}
					/>
					<Card>
						<>
							{content}
							{pagination}
						</>
					</Card>
				</>
			)}
		</PageWrapper>
	);
};
