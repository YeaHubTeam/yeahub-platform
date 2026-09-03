import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import {
	ReferralLinkCountSkeleton,
	ReferralLinkDateSkeleton,
	ReferralLinkOwnerSkeleton,
	ReferralLinkSumSkeleton,
} from '@/entities/referralLink';

import styles from './ReferralLinkAdditionalInfo.module.css';

export const ReferralLinkAdditionalInfoSkeleton = () => {
	return (
		<CardSkeleton className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="24">
				<ReferralLinkSumSkeleton />
				<ReferralLinkCountSkeleton />
				<ReferralLinkDateSkeleton />
				<ReferralLinkDateSkeleton />
				<ReferralLinkOwnerSkeleton />
			</Flex>
		</CardSkeleton>
	);
};
