import { ChoiseFilterProps } from '../model/types';

export const getUpdatedSingleFilter = (
	newValue: string,
	selectedFilter: ChoiseFilterProps['selectedFilter'],
): string[] | undefined => {
	const current = selectedFilter || [];
	const isDataExist = selectedFilter?.some((item) => newValue === item);
	const updates = isDataExist
		? current.filter((item) => newValue !== item)
		: [...current, newValue];
	return updates.length === 0 ? undefined : updates;
};

export const getUpdatedMultipleFilter = (
	newValue: string[],
	selectedFilter: ChoiseFilterProps['selectedFilter'],
): string[] | undefined => {
	const current = selectedFilter || [];
	const isDataExist = selectedFilter?.some((item) => newValue.includes(item));
	const updates = isDataExist
		? current.filter((item) => !newValue.includes(item))
		: [...current, ...newValue];
	return updates.length === 0 ? undefined : updates;
};
