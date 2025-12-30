import { QuestionsFilterParams } from '@/entities/question';

export const normalizeFilters = (filters: QuestionsFilterParams) => {
	const { status, ...rest } = filters;

	if (status === 'favorite') {
		return { ...rest, areFavorites: true };
	}
	if (status === 'learned') {
		return { ...rest, isLearned: true };
	}
	return { ...rest };
};
