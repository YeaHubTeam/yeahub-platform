import { useScreenSize } from '@/shared/hooks';

import { LearnedQuestion } from '@/entities/question';

const DESKTOP_ITEM_MAX_WIDTH = 208;
const TABLET_ITEM_MAX_WIDTH = 224;

export const useItemsSizeCalculation = ({
	learnedQuestions,
}: {
	learnedQuestions: LearnedQuestion[];
}) => {
	const { isLargeScreen } = useScreenSize();

	const maxItemHeight = isLargeScreen ? DESKTOP_ITEM_MAX_WIDTH : TABLET_ITEM_MAX_WIDTH;

	const percentages = learnedQuestions.map((question) => question.learnedPercentage);
	const maxPercentage = Math.max(...percentages);

	const calculateItemHeight = (itemPercent: number) => {
		return Math.floor((itemPercent / maxPercentage) * maxItemHeight);
	};

	const itemsCount = isLargeScreen ? 6 : 4;
	const itemsGap: '12' | '26' = isLargeScreen ? '12' : '26';

	return {
		itemsGap,
		itemsCount,
		maxItemHeight,
		calculateItemHeight,
	};
};
