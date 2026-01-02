import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import {
	ITEMS_COUNT_MOBILE,
	ITEMS_COUNT_DESKTOP,
} from '../../lib/constants/mostDifficultQuestions';
import { MostDifficultQuestionItemSkeleton } from '../MostDifficultQuestionItem/MostDifficultQuestionItem.skeleton';

import styles from './MostDifficultQuestionsWidget.module.css';

export const MostDifficultQuestionsWidgetSkeleton = () => {
	const { isSmallScreen } = useScreenSize();
	const QUESTIONS_COUNT = isSmallScreen ? ITEMS_COUNT_MOBILE : ITEMS_COUNT_DESKTOP;

	return (
		<CardSkeleton
			actionRoute="actionRoute"
			title="title"
			className={styles.card}
			isActionPositionBottom
		>
			<Flex direction="column" gap="12">
				{[...Array(QUESTIONS_COUNT)].map((_, i) => (
					<MostDifficultQuestionItemSkeleton key={i} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
