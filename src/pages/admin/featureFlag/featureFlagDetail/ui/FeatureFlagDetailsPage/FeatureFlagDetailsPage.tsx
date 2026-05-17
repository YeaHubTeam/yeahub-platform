import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { FeatureFlags, i18Namespace } from '@/shared/config';

import { useGetFeatureFlagByIdQuery } from '@/entities/featureFlag';

import { PageWrapper } from '@/widgets/PageWrapper';

import { FeatureFlagDetailsPageContent } from '../FeatureFlagDetailsPageContent/FeatureFlagDetailsPageContent';

const FeatureFlagDetailsPage = () => {
	const { flagId } = useParams<{ flagId: string }>();
	const { t } = useTranslation([i18Namespace.featureFlags]);

	if (!flagId) {
		return null;
	}

	const { data, isLoading, isError, refetch } = useGetFeatureFlagByIdQuery(flagId);
	const content = data && <FeatureFlagDetailsPageContent featureFlag={data} />;

	const stubs = {
		error: {
			title: t(FeatureFlags.STUB_ERROR_TITLE),
			text: t(FeatureFlags.STUB_ERROR_TEXT),
			buttonText: t(FeatureFlags.STUB_ERROR_BUTTON),
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			roles={['admin']}
			isLoading={isLoading}
			hasError={isError}
			hasData={!!data}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default FeatureFlagDetailsPage;
