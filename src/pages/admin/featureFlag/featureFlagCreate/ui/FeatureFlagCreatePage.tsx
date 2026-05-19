import { FeatureFlagCreateForm } from '@/features/featureFlag/createFeatureFlag';

import { PageWrapper } from '@/widgets/PageWrapper';

const FeatureFlagCreatePage = () => {
	const content = <FeatureFlagCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default FeatureFlagCreatePage;
