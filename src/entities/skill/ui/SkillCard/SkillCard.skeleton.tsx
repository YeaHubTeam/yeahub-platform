import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ImageWithWrapperSkeleton } from '@/shared/ui/ImageWithWrapper';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './SkillCard.module.css';

export const SkillCardSkeleton = () => {
	return (
		<Flex gap="20">
			<Flex direction="column" gap="20" flex={1}>
				<CardSkeleton withOutsideShadow>
					<Flex gap="16" direction="row">
						<ImageWithWrapperSkeleton className={styles['card-image']} />
						<TextSkeleton variant="body6" width={200} />
					</Flex>
				</CardSkeleton>

				<CardSkeleton withOutsideShadow>
					<Flex direction="column" gap="20">
						<TextSkeleton variant="body5-accent" width={200} />
						<TextSkeleton variant="body3-accent" width="100%" />
						<TextSkeleton variant="body3-accent" width="80%" />
					</Flex>
				</CardSkeleton>
			</Flex>

			<Flex direction="column" gap="20" className={styles.additional}>
				<CardSkeleton withOutsideShadow>
					<Flex direction="column" gap="32">
						<Flex direction="column" gap="8">
							<TextSkeleton variant="body2" width={180} />
							<Skeleton width={180} height={32} borderRadius={8} />
						</Flex>

						<Flex direction="column" gap="8">
							<TextSkeleton variant="body2" width={160} />
							<Skeleton width={140} height={32} borderRadius={8} />
						</Flex>

						<Flex direction="column" gap="8">
							<TextSkeleton variant="body2" width={140} />
							<Skeleton width={140} height={32} borderRadius={8} />
						</Flex>

						<Flex direction="column" gap="8">
							<TextSkeleton variant="body2" width={100} />
							<TextSkeleton variant="body2" width={160} />
						</Flex>
					</Flex>
				</CardSkeleton>
			</Flex>
		</Flex>
	);
};
