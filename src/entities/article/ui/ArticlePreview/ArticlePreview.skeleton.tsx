import { useScreenSize } from '@/shared/libs';
import { Card } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './ArticlePreview.module.css';

export const ArticlePreviewSkeleton = () => {
	const { isMobileS } = useScreenSize();

	return (
		<Card className={styles.content} withOutsideShadow>
			<div className={styles.wrapper}>
				<Skeleton className={styles['image-wrapper']} borderRadius={isMobileS ? 18 : 12} />
				<Flex direction="column" gap="16" className={styles['wrapper-content']}>
					<TextSkeleton variant="body3" width="55%" />
					<Flex direction="column" gap="8">
						<Flex direction="column">
							<TextSkeleton variant="body3-accent" width="90%" />
							{isMobileS && <TextSkeleton variant="body3-accent" width="55%" />}
						</Flex>
						<Flex direction="column">
							<TextSkeleton variant="body3" width="100%" />
							<TextSkeleton variant="body3" width="70%" />
						</Flex>
					</Flex>
					<TextSkeleton variant="body3" width={75} />
				</Flex>
			</div>
		</Card>
	);
};
