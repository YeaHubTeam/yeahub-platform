import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { ITEMS_COUNT_DESKTOP, ITEMS_COUNT_MOBILE } from '../../model/constants';
import { SkillProficiencyItemSkeleton } from '../SkillProficiencyItem/SkillProficiencyItem.skeleton';

import styles from './SkillsProficiencyWidget.module.css';

export const SkillsProficiencyWidgetSkeleton = () => {
	const { isMobileS, isTablet, isLargeScreen } = useScreenSize();
	const BARS_COUNT = isMobileS || isTablet ? ITEMS_COUNT_MOBILE : ITEMS_COUNT_DESKTOP;
	const BAR_HEIGHT = isLargeScreen ? 34.8 : isMobileS || isTablet ? 56.2 : 37.5;

	return (
		<CardSkeleton
			actionRoute="actionRoute"
			title="title"
			isActionPositionBottom
			className={`${styles['card']} ${styles['card-skeleton']}`}
		>
			<Flex direction="row" gap="12" justify="between">
				{[...Array(BARS_COUNT)].map((_, i) => (
					<SkillProficiencyItemSkeleton
						key={i}
						currentHeight={Number(`${(BARS_COUNT - i) * BAR_HEIGHT}`)}
					/>
				))}
			</Flex>
		</CardSkeleton>
	);
};
