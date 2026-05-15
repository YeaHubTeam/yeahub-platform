import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, FeatureFlags } from '@/shared/config';
import { route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetFeatureFlagsListQuery } from '@/entities/featureFlag';
import { useGetUserRolesListQuery } from '@/entities/user';

import { FeatureFlagFilters, useFeatureFlagFilters } from '@/features/featureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { FeatureFlagsTable } from './FeatureFlagsTablePage';

export const FeatureFlagsPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.featureFlags]);

	const { filters, hasFilters, onChangePage, onChangeSearch, onChangeIsEnabled, onChangeRoles } =
		useFeatureFlagFilters({
			page: 1,
		});

	const { data: userRoles } = useGetUserRolesListQuery();

	const { page, enabled, search, selectedRoles } = filters;
	const {
		data: featureFlagsData,
		isError,
		refetch,
	} = useGetFeatureFlagsListQuery({
		page,
		enabled,
		search: filters.search ? search : undefined,
		roleIds:
			selectedRoles && userRoles?.length
				? userRoles
						.filter((item) => selectedRoles.includes(item.id))
						.map((item) => item.id)
						.join(', ')
				: undefined,
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
							/>
						)}
						hasFilters={hasFilters}
						renderRemoveButton={() => <div>Button</div>}
						showResetFilterButton={true}
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
