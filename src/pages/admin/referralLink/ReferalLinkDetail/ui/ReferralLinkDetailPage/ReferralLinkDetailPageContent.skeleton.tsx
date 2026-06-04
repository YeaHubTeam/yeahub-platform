import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { ReferralLinkCardSkeleton } from '@/entities/referralLink';

import { ReferralLinkAdditionalInfoSkeleton } from '@/widgets/referralLink/ReferralLinkAdditionalInfo';

export const ReferralLinkDetailPageContentSkeleton = () => {
	return (
		<>
			<BackHeaderSkeleton>
				<Skeleton width={170} height={48} borderRadius="12px" />
				<Skeleton width={170} height={48} borderRadius="12px" />
			</BackHeaderSkeleton>
			<Flex gap="20" align="start">
				<ReferralLinkCardSkeleton />
				<ReferralLinkAdditionalInfoSkeleton />
			</Flex>
		</>
	);
};
