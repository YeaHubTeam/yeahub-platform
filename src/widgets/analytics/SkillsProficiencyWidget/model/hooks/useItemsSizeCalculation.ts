import { useScreenSize } from '@/shared/libs';

import { LearnedQuestion } from '@/entities/question';

import { ITEMS_COUNT_DESKTOP, ITEMS_COUNT_MOBILE } from '../constants';

const DESKTOP_ITEM_MAX_WIDTH = 208;
const TABLET_ITEM_MAX_WIDTH = 224;

export const useItemsSizeCalculation = ({
	learnedQuestions,
}: {
	learnedQuestions: LearnedQuestion[];
}) => {
	const { isLargeScreen, isTablet, isMobileS } = useScreenSize();

	const maxItemHeight = isLargeScreen ? DESKTOP_ITEM_MAX_WIDTH : TABLET_ITEM_MAX_WIDTH;

	const percentages = learnedQuestions.map((question) => question.learnedPercentage);
	const maxPercentage = Math.max(...percentages);

	const calculateItemHeight = (itemPercent: number) => {
		return Math.floor((itemPercent / maxPercentage) * maxItemHeight);
	};

	const itemsCount = isMobileS || isTablet ? ITEMS_COUNT_MOBILE : ITEMS_COUNT_DESKTOP;

	return {
		itemsCount,
		maxItemHeight,
		calculateItemHeight,
	};
};
