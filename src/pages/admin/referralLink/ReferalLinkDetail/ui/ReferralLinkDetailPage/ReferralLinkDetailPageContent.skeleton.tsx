import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

import { ReferralLinkCardSkeleton } from '@/entities/referralLink';

import { DeleteReferralLinkButtonSkeleton } from '@/features/referralLinks/deleteReferralLink';

import { ReferralLinkAdditionalInfoSkeleton } from '@/widgets/referralLink/ReferralLinkAdditionalInfo';

export const ReferralLinkDetailPageContentSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<DeleteReferralLinkButtonSkeleton />
				<ButtonSkeleton width={180} />
			</BackHeaderSkeleton>
			<Flex gap="20" align="start">
				<ReferralLinkCardSkeleton />
				<ReferralLinkAdditionalInfoSkeleton />
			</Flex>
		</>
	);
};
