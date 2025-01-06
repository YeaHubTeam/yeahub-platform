import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './AttemptInfoItem.module.css';

export const AttemptInfoItemSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex align="center" gap="12" componentType="li" className={styles.item}>
			<Skeleton className={styles.divider} />
			<Flex direction="column">
				<TextSkeleton variant={isMobile ? 'body2-accent' : 'body3-accent'} width={50} />
				<TextSkeleton variant={isMobile ? 'body1-accent' : 'body2-accent'} width={30} />
			</Flex>
		</Flex>
	);
};
