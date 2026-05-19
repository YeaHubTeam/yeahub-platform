import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, FeatureFlags } from '@/shared/config';
import { route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { useGetFeatureFlagsListQuery } from '@/entities/featureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';
import { SearchSection } from '@/widgets/SearchSection';

import { FeatureFlagsTable } from './FeatureFlagsTablePage';

export const FeatureFlagsPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.featureFlags]);

	const [page, setPage] = useState(1);

	const {
		data: featureFlagsData,
		isError,
		refetch,
	} = useGetFeatureFlagsListQuery({
		page,
	});

	const hasFeatureFlags = featureFlagsData?.data && featureFlagsData.data.length > 0;

	const paginationOptions = {
		page,
		limit: 10,
		total: featureFlagsData?.total || 0,
		onChangePage: setPage,
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
			hasData={hasFeatureFlags}
			hasError={isError}
			paginationOptions={paginationOptions}
		>
			{({ content, pagination }) => (
				<Flex direction="column" gap="24">
					<SearchSection to="create" />

					<Card>
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
