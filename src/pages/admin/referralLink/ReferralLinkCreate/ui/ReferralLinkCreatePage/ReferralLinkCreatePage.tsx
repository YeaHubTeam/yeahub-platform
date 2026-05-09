import { ReferralLinkCreateForm } from '@/features/referralLinks/createReferralLink';

import { PageWrapper } from '@/widgets/PageWrapper';

const ReferralLinkCreatePage = () => {
	const content = <ReferralLinkCreateForm />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ReferralLinkCreatePage;
