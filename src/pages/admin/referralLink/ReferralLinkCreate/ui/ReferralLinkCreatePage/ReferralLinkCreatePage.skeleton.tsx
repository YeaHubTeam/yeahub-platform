import { ReferralLinkCreateFormSkeleton } from '@/features/referralLinks/createReferralLink';

import { PageWrapper } from '@/widgets/PageWrapper';

export const ReferralLinkCreatePageSkeleton = () => {
	const content = <ReferralLinkCreateFormSkeleton />;

	return (
		<PageWrapper hasData stubs={{}} roles={['admin']} content={content}>
			{({ content }) => content}
		</PageWrapper>
	);
};
