import { useParams } from 'react-router-dom';

import { useGetReferralLinkByIdQuery } from '@/entities/referralLink';

import { ReferralLinkEditForm } from '@/features/referralLinks/editReferralLink';

import { PageWrapper, type PageWrapperStubs } from '@/widgets/PageWrapper';

const ReferralLinkEditPage = () => {
	const { referralLinkId = '' } = useParams<{ referralLinkId: string }>();

	const {
		data: referralLink,
		isLoading,
		isError,
		refetch,
	} = useGetReferralLinkByIdQuery({ id: referralLinkId });

	const hasReferralLink = referralLink && Object.keys(referralLink).length > 0;

	const content = hasReferralLink ? <ReferralLinkEditForm referralLink={referralLink} /> : null;

	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasReferralLink}
			stubs={stubs}
			roles={['admin']}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ReferralLinkEditPage;
