import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ProfileCard.module.css';

export const ProfileCardSkeleton = () => {
	return (
		<Flex className={styles.container}>
			<Flex className={styles.card} align="center" justify="between">
				<Flex className={styles.info} align="center" gap="16">
					<Flex className={styles['image-wrapper']}>
						<ImageWithWrapperSkeleton
							className={styles.image}
							height={38}
							width={38}
							borderRadius="50%"
						/>
					</Flex>
					<TextSkeleton className={styles.title} variant="body3-accent" width={220} />
				</Flex>
				<ButtonSkeleton className={styles.button} width={100} />
			</Flex>
		</Flex>
	);
};
