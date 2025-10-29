import { FilterFromUser } from '@/shared/hooks';

export const normalizeFilters = (filters: FilterFromUser) => {
	const { status, ...rest } = filters;

	if (status === 'favorite') {
		return { ...rest, areFavorites: true };
	}
	if (status === 'learned') {
		return { ...rest, isLearned: true };
	}
	return { ...rest };
};
