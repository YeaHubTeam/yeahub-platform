import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './MyResourceCard.module.css';

export const MyResourceCardSkeleton = () => {
	return (
		<Card withOutsideShadow className={styles.content}>
			<Flex className={styles.wrapper}>
				<ImageWithWrapperSkeleton className={styles['image-wrapper']} />
				<Flex direction="column" gap="12" maxWidth={true}>
					<TextSkeleton variant="body2" width="100%" className={styles.hostname} />
					<TextSkeleton variant="body3-accent" width="100%" className={styles.title} />
					<TextSkeleton variant="body2" width="100%" />
				</Flex>
			</Flex>
		</Card>
	);
};
