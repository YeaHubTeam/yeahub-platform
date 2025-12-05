import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './MostDifficultQuestionsWidget.module.css';

export const MostDifficultQuestionsWidgetSkeleton = () => {
	const { isSmallScreen } = useScreenSize();
	const QUESTIONS_COUNT = isSmallScreen ? 3 : 6;

	return (
		<CardSkeleton
			actionRoute="actionRoute"
			title="title"
			className={styles.card}
			isActionPositionBottom
		>
			<Flex direction="column" gap="12">
				{[...Array(QUESTIONS_COUNT)].map((_, i) => (
					<CardSkeleton size="small" withOutsideShadow key={i}>
						<Flex direction="column" gap="12">
							<Flex direction="row" justify="between" gap="120">
								<TextSkeleton variant="body2-accent" width="247px" />
								<TextSkeleton variant="body2-accent" width="40px" />
							</Flex>
							<Skeleton width="100%" height="10px" />
						</Flex>
					</CardSkeleton>
				))}
			</Flex>
		</CardSkeleton>
	);
};
