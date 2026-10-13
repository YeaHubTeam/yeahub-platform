import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ReferralLinkCard.module.css';

export const ReferralLinkCardSkeleton = () => {
	return (
		<CardSkeleton className={styles.card} withOutsideShadow>
			<Flex direction="column" gap="14">
				<TextSkeleton width={250} variant="body5-accent" />
				<TextSkeleton width={300} variant="body3-accent" />
			</Flex>
		</CardSkeleton>
	);
};
