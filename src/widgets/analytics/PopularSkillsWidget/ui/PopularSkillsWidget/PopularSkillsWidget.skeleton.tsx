import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { ITEMS_COUNT } from '../../model/constants';
import { PopularSkillItemSkeleton } from '../PopularSkillItem/PopularSkillItem.skeleton';

import styles from './PopularSkillsWidget.module.css';

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
				{[...Array(ITEMS_COUNT)].map((_, i) => (
					<PopularSkillItemSkeleton key={i} currentSize={(ITEMS_COUNT - i) * BAR_WIDTH} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
