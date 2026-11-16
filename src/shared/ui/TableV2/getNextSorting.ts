import type { SortingState } from './types';

export const getNextSorting = <TColumnId extends string>(
	columnId: TColumnId,
	sorting?: SortingState<TColumnId>,
): SortingState<TColumnId> => {
	if (sorting?.columnId !== columnId) {
		return { columnId, direction: 'ASC' };
	}

	if (sorting.direction === 'ASC') {
		return { columnId, direction: 'DESC' };
	}

	return null;
};
