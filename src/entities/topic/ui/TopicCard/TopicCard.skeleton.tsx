import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './TopicCard.module.css';

export const TopicCardSkeleton = () => {
	return (
		<Flex direction="column" gap="24" className={styles.wrap}>
			<Card withOutsideShadow className={styles.card}>
				<Flex gap="16">
					<TextSkeleton variant="body6" width="50%" />
				</Flex>
			</Card>

			<Card withOutsideShadow expandable className={styles.card}>
				<Flex direction="column" gap="20">
					<TextSkeleton variant="body5" width="50%" />
					<TextSkeleton variant="body3" width="100%" />
				</Flex>
			</Card>
		</Flex>
	);
};
