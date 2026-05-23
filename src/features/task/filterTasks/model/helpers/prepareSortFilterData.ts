import { TFunction } from 'i18next';

interface SortFilterItem<T>{
	label: string;
	value: T;
	id: number;
}

interface FilterDataProps<T>{
	t: TFunction;
	value?: T;
	data: readonly SortFilterItem<T>[];
}

type PreparedSortFilterItem<T> = {
	id: number;
	value: T;
	title: string;
	active: boolean;
};

export default function prepareSortFilterData<T extends string>({data, value, t}: FilterDataProps<T>): PreparedSortFilterItem<T>[] {

	const preparedData = data.map((item) => ({
		...item,
		title: t(item.label),
		active: value === item.value,
	}));
	
	return preparedData
}
