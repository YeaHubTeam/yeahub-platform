import { BackButton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';

import { type ReferralLink, ReferralLinkCard } from '@/entities/referralLink';

import { ReferralLinkAdditionalInfo } from '@/widgets/referralLink/ReferralLinkAdditionalInfo';

interface ReferralLinkDetailPageContentProps {
	referralLink: ReferralLink;
}

export const ReferralLinkDetailPageContent = ({
	referralLink,
}: ReferralLinkDetailPageContentProps) => {
	return (
		<>
			<Flex align="center" justify="between" style={{ marginBottom: 24 }}>
				<BackButton />
			</Flex>
			<Flex gap="20" align="start">
				<ReferralLinkCard code={referralLink.refCode} link={referralLink.url} />
				<ReferralLinkAdditionalInfo
					ownerId={referralLink.ownerId}
					ownerUsername={referralLink.ownerUsername}
					linkedCount={referralLink.linkedCount}
					amountSum={referralLink.amountSum}
					createdAt={referralLink.createdAt}
					updatedAt={referralLink.createdAt}
				/>
			</Flex>
		</>
	);
};
