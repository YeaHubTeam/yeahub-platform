import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { i18Namespace, ROUTES, FeatureFlags } from '@/shared/config';
import { route } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';

import { useGetFeatureFlagsListQuery } from '@/entities/featureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { FeatureFlagsTable } from './FeatureFlagsTablePage';

export const FeatureFlagPage = () => {
	const navigate = useNavigate();
	const { t } = useTranslation([i18Namespace.featureFlags]);

	const [page, setPage] = useState(1);

	const {
		data: featureFlagsData,
		isError,
		refetch,
	} = useGetFeatureFlagsListQuery({
		page,
		limit: 10,
		clientType: 'WEB',
	});

	const hasFeatureFlags = featureFlagsData?.data && featureFlagsData.data.length > 0;

	const totalPages = Math.ceil((featureFlagsData?.total || 0) / 10);

	const paginationOptions =
		hasFeatureFlags && totalPages > 1
			? {
					page,
					limit: 10,
					total: featureFlagsData?.total || 0,
					onChangePage: setPage,
				}
			: undefined;

	const content = (
		<div>
			<div>{hasFeatureFlags && <FeatureFlagsTable featureFlags={featureFlagsData?.data} />}</div>
		</div>
	);

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
				<Card>
					<>
						{content}
						{pagination}
					</>
				</Card>
			)}
		</PageWrapper>
	);
};

export default FeatureFlagPage;
