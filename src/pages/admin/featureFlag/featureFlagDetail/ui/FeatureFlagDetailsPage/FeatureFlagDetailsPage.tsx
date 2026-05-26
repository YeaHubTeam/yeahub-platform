import { useParams } from 'react-router-dom';

import { useGetFeatureFlagByIdQuery } from '@/entities/featureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { FeatureFlagDetailsPageContent } from '../FeatureFlagDetailsPageContent/FeatureFlagDetailsPageContent';

const FeatureFlagDetailsPage = () => {
	const { flagId = '' } = useParams<{ flagId: string }>();

	const { data, isLoading, isError, refetch, error } = useGetFeatureFlagByIdQuery(flagId);
	const content = data && <FeatureFlagDetailsPageContent featureFlag={data} />;
	const hasData = data && Object.keys(data).length > 0;
	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};
	return (
		<PageWrapper
			roles={['admin']}
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default FeatureFlagDetailsPage;
