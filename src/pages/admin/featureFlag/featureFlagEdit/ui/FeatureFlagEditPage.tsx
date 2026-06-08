import { useParams } from 'react-router-dom';

import { useGetFeatureFlagByIdQuery } from '@/entities/featureFlag';

import { FeatureFlagEditForm } from '@/features/featureFlag/editFeatureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

const FeatureFlagEditPage = () => {
	const { flagId = '' } = useParams<{ flagId: string }>();

	const { data: featureFlag, isLoading, isError, refetch } = useGetFeatureFlagByIdQuery(flagId);

	const hasFeatureFlag = featureFlag && Object.keys(featureFlag).length > 0;

	const content = hasFeatureFlag ? <FeatureFlagEditForm featureFlag={featureFlag} /> : null;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasFeatureFlag}
			stubs={stubs}
			content={content}
			roles={['admin']}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default FeatureFlagEditPage;
