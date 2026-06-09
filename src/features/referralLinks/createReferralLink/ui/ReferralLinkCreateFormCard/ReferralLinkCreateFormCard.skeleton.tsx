import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ReferralLinkFormSkeleton } from '@/entities/referralLink';

import styles from './ReferralLinkCreateFormCard.module.css';

export const ReferralLinkCreateFormCardSkeleton = () => {
	return (
		<CardSkeleton className={styles.content}>
			<Flex direction="column" gap="28">
				<TextSkeleton variant="body5-strong" width={320} />
				<ReferralLinkFormSkeleton />
			</Flex>
		</CardSkeleton>
	);
};
