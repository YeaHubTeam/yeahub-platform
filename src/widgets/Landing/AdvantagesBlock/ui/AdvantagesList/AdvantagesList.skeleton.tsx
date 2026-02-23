import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AdvantagesList.module.css';

export const AdvantagesListSkeleton = () => {
	return (
		<>
			<Flex className={styles.container}>
				{[...Array(6)].map((_, i) => (
					<CardSkeleton title="" key={i} withOutsideShadow>
						<IconSkeleton size={32} borderRadius={10} className={styles['icon-margin']} />

						<Flex className={styles['card-skeleton']}>
							<Flex gap="10" direction="column">
								<TextSkeleton variant="body5-strong" width="100%" />
								<TextSkeleton variant="body3-accent" width="100%" />
							</Flex>
							<Flex justify="start">
								<Skeleton width="100%" height="150px" />
							</Flex>
						</Flex>
					</CardSkeleton>
				))}
			</Flex>
		</>
	);
};
