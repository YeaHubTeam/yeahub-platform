import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './CompanyCard.module.css';

export const CompanyCardSkeleton = () => {
	return (
		<Flex className={styles.wrap}>
			<Card withOutsideShadow className={styles.card}>
				<Flex gap="16">
					<ImageWithWrapperSkeleton className={styles['card-image']} />
					<TextSkeleton width="100%" variant="body6" />
				</Flex>
			</Card>
		</Flex>
	);
};
