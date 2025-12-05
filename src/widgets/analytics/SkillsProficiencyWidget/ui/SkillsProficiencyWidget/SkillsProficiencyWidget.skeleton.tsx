import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './SkillsProficiencyWidget.module.css';

export const SkillsProficiencyWidgetSkeleton = () => {
	const { isMobileS, isTablet, isLargeScreen } = useScreenSize();
	const BARS_COUNT = isMobileS || isTablet ? 4 : 6;
	const BAR_HEIGHT = isLargeScreen ? 34.8 : isMobileS || isTablet ? 56.2 : 37.5;

	return (
		<CardSkeleton
			actionRoute="actionRoute"
			title="title"
			isActionPositionBottom
			className={styles.card}
		>
			<Flex direction="row" gap="12" justify="between">
				{[...Array(BARS_COUNT)].map((_, i) => (
					<Flex key={i} direction="column" gap="12" justify="between">
						<TextSkeleton variant="body3-accent" width="40px" />
						<Flex direction="column" gap="12" align="center">
							<Skeleton height={`${(BARS_COUNT - i) * BAR_HEIGHT}px`} width="24px" />
							<TextSkeleton variant="body3-accent" width="40px" />
						</Flex>
					</Flex>
				))}
			</Flex>
		</CardSkeleton>
	);
};
