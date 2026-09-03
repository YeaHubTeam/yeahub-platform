import { useParams } from 'react-router-dom';

import { useGetFeatureFlagByIdQuery } from '@/entities/featureFlag';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { FeatureFlagDetailsPageContent } from '../FeatureFlagDetailsPageContent/FeatureFlagDetailsPageContent';
import { FeatureFlagDetailsPageContentSkeleton } from '../FeatureFlagDetailsPageContent/FeatureFlagDetailsPageContent.skeleton';

const FeatureFlagDetailsPage = () => {
	const { flagId = '' } = useParams<{ flagId: string }>();

	const { data, isLoading, isError, refetch } = useGetFeatureFlagByIdQuery(flagId);
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
			skeleton={<FeatureFlagDetailsPageContentSkeleton />}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default FeatureFlagDetailsPage;
