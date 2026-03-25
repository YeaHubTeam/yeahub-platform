import { useParams } from 'react-router-dom';

import { useGetReferralLinkByIdQuery } from '@/entities/referralLink';

import { PageWrapper, PageWrapperStubs } from '@/widgets/PageWrapper';

import { ReferralLinkDetailPageContent } from './ReferralLinkDetailPageContent';

const ReferralLinkDetailPage = () => {
	const { referralLinkId = '' } = useParams<{ referralLinkId: string }>();

	const {
		data: referralLink,
		isLoading,
		isError,
		refetch,
	} = useGetReferralLinkByIdQuery({ id: referralLinkId });
	const stubs: PageWrapperStubs = {
		error: {
			onClick: refetch,
		},
	};
	const hasData = !!referralLink && Object.keys(referralLink).length > 0;
	const content = referralLink ? (
		<ReferralLinkDetailPageContent referralLink={referralLink} />
	) : null;

	return (
		<PageWrapper
			isLoading={isLoading}
			hasError={isError}
			hasData={hasData}
			roles={['admin']}
			stubs={stubs}
			content={content}
		>
			{({ content }) => content}
		</PageWrapper>
	);
};

export default ReferralLinkDetailPage;
