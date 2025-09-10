import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './MediaLinkItem.module.css';

export const MediaLinkItemSkeleton = () => {
	return (
		<Flex justify="between" className={styles['item']} align="center" componentType="li">
			<Flex gap="12" align="start">
				<Skeleton className={styles['img-wrapper']} />
				<Flex direction="column" gap="6">
					<TextSkeleton variant="body3-strong" width={200} />
					<TextSkeleton variant="body3" width={200} />
				</Flex>
			</Flex>
			<TextSkeleton variant="body3-strong" width={170} />
		</Flex>
	);
};
