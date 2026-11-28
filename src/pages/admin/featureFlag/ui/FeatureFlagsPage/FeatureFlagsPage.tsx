import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { FeatureFlagsTranslation, i18Namespace, ROUTES } from '@/shared/config';
import type { SelectedAdminEntities } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetFeatureFlagsListQuery } from '@/entities/featureFlag';

import {
	FEATURE_FLAGS_DEFAULT_FILTERS,
	FeatureFlagsFilters,
	useFeatureFlagsFilters,
} from '@/features/featureFlag/filterFeatureFlags';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import styles from './FeatureFlagsPage.module.css';
import { FeatureFlagsPageSkeleton } from './FeatureFlagsPage.skeleton';
import { FeatureFlagsTable } from './FeatureFlagsTable';

const FeatureFlagsPage = () => {
	const { t } = useTranslation(i18Namespace.featureFlags);
	const navigate = useNavigate();
	const [selectedFlags, setSelectedFlags] = useState<SelectedAdminEntities<string>>([]);

	const {
		filters,
		hasFilters,
		hasActiveFilters,
		onChangePage,
		onChangeSearch,
		onChangeRoleIds,
		onChangeClientType,
		onChangeEnabled,
		onResetFilters,
	} = useFeatureFlagsFilters(FEATURE_FLAGS_DEFAULT_FILTERS);

	const { data, isLoading, isError, refetch } = useGetFeatureFlagsListQuery({
		page: filters.page,
		search: filters.search,
		roleIds: filters.roleIds?.join(','),
		clientType: filters.clientType,
		enabled: filters.enabled,
	});

	const flags = data?.data ?? [];

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(FeatureFlagsTranslation.STUB_EMPTY_TITLE),
			subtitle: t(FeatureFlagsTranslation.STUB_EMPTY_SUBTITLE),
			buttonText: t(FeatureFlagsTranslation.STUB_EMPTY_SUBMIT),
			onClick: () => navigate(ROUTES.admin.featureFlags.create.page),
		},
		error: { onClick: refetch },
		'filter-empty': {
			title: t(FeatureFlagsTranslation.STUB_FILTER_TITLE),
			subtitle: t(FeatureFlagsTranslation.STUB_FILTER_SUBTITLE),
			onClick: onResetFilters,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			skeleton={<FeatureFlagsPageSkeleton />}
			hasError={isError}
			hasFilters={hasFilters}
			hasData={flags.length > 0}
			stubs={stubs}
			roles={['admin']}
			paginationOptions={{
				page: filters.page ?? 1,
				onChangePage,
				limit: data?.limit ?? 10,
				total: data?.total ?? 0,
			}}
			content={
				<FeatureFlagsTable
					flags={flags}
					selectedFlags={selectedFlags}
					onSelectFlags={setSelectedFlags}
				/>
			}
		>
			{({ content, pagination }) => (
				<Flex componentType="main" direction="column" gap="24">
					<SearchSection
						to="create"
						renderFilter={() => (
							<FeatureFlagsFilters
								filters={filters}
								onChangeRoleIds={onChangeRoleIds}
								onChangeClientType={onChangeClientType}
								onChangeEnabled={onChangeEnabled}
							/>
						)}
						hasFilters={hasActiveFilters}
						showResetFilterButton={hasFilters}
						searchValue={filters.search}
						onSearch={onChangeSearch}
						onResetFilters={onResetFilters}
					/>
					<Card className={styles.content}>
						<>
							{content}
							{pagination}
						</>
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default FeatureFlagsPage;
