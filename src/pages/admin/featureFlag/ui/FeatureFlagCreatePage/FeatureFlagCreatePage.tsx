import { FeatureFlagCreateForm } from '@/features/featureFlag/createFeatureFlag';

import { PageWrapper } from '@/widgets/PageWrapper';

const FeatureFlagCreatePage = () => (
	<PageWrapper hasData roles={['admin']} stubs={{}} content={<FeatureFlagCreateForm />}>
		{({ content }) => content}
	</PageWrapper>
);

export default FeatureFlagCreatePage;
