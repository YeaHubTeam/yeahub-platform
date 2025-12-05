import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './PopularSkillsWidget.module.css';

const BARS_COUNT = 3;
const BAR_WIDTH = 180;

export const PopularSkillsWidgetSkeleton = () => {
	return (
		<CardSkeleton
			className={styles['popular-skills-card']}
			size="medium"
			title="title"
			actionRoute="actionRoute"
			isActionPositionBottom
		>
			<Flex direction="column" gap="20">
				{[...Array(BARS_COUNT)].map((_, i) => (
					<CardSkeleton size="small" withOutsideShadow key={i}>
						<Flex direction="column" gap="10">
							<TextSkeleton variant="body3-accent" width="80px" />
							<Flex direction="row" justify="between" gap="60">
								<Skeleton width={`${(BARS_COUNT - i) * BAR_WIDTH}px`} height="23px" />
								<Skeleton width="40px" height="23px" />
							</Flex>
						</Flex>
					</CardSkeleton>
				))}
			</Flex>
		</CardSkeleton>
	);
};
