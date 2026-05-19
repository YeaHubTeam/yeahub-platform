import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, FeatureFlags } from '@/shared/config';
import { route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetFeatureFlagsListQuery } from '@/entities/featureFlag';

import { FeatureFlagFilters, useFeatureFlagFilters } from '@/features/featureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { FeatureFlagsTable } from './FeatureFlagsTablePage';

export const FeatureFlagsPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.featureFlags]);

	const {
		filters,
		hasFilters,
		onChangePage,
		onChangeSearch,
		onChangeIsEnabled,
		onChangeRoles,
		onChangeClientType,
		onResetFilters,
	} = useFeatureFlagFilters({
		page: 1,
	});

	const { page, enabled, search, roleIds, clientType } = filters;
	const {
		data: featureFlagsData,
		isError,
		refetch,
	} = useGetFeatureFlagsListQuery({
		page,
		enabled,
		search: filters.search ? search : undefined,
		roleIds: roleIds?.length ? roleIds.join(', ') : undefined,
		clientType: clientType || undefined,
	});

	const hasFeatureFlags = featureFlagsData?.data && featureFlagsData.data.length > 0;

	const paginationOptions = {
		page: filters.page || 1,
		onChangePage: onChangePage,
		limit: 10,
		total: featureFlagsData?.total || 0,
	};

	const content = hasFeatureFlags && <FeatureFlagsTable featureFlags={featureFlagsData?.data} />;

	const stubs: PageWrapperStubs = {
		empty: {
			title: t(FeatureFlags.STUB_EMPTY_TITLE),
			subtitle: t(FeatureFlags.STUB_EMPTY_SUBTITLE),
			buttonText: t(FeatureFlags.STUB_EMPTY_SUBMIT),
			onClick: () => {
				navigate(route(ROUTES.admin.featureFlags.create.page));
			},
		},
		'filter-empty': {
			title: t(FeatureFlags.STUB_FILTER_EMPTY_TITLE),
			subtitle: t(FeatureFlags.STUB_FILTER_EMPTY_SUBTITLE),
			buttonText: t(FeatureFlags.STUB_FILTER_EMPTY_SUBMIT),
			onClick: onResetFilters,
		},
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			roles={['admin']}
			stubs={stubs}
			content={content}
			hasFilters={hasFilters}
			hasData={hasFeatureFlags}
			hasError={isError}
			paginationOptions={paginationOptions}
		>
			{({ content, pagination }) => (
				<Flex direction="column" gap="24">
					<SearchSection
						to="create"
						searchValue={filters.search}
						onSearch={onChangeSearch}
						renderFilter={() => (
							<FeatureFlagFilters
								filters={filters}
								onChangeIsEnabled={onChangeIsEnabled}
								onChangeRoles={onChangeRoles}
								onChangeClientType={onChangeClientType}
							/>
						)}
						hasFilters={hasFilters}
						renderRemoveButton={() => <div>Button</div>}
						onResetFilters={onResetFilters}
						showResetFilterButton={hasFilters || (page || 1) > 1}
					/>
					<Card>
						{content}
						{pagination}
					</Card>
				</Flex>
			)}
		</PageWrapper>
	);
};

export default FeatureFlagsPage;
