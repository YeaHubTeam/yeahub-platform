import { BaseFilterSection } from "../BaseFilterSection";

interface SortFilterItem<T>{
	title: string;
	value: T;
	id: number;
}

interface SortFilterSectionProps<T extends string>{
	data: SortFilterItem<T>[];
	title: string;
	onChange: (value?: T) => void;
	value?: string;
}

export const SortFilterSection = <T extends string>({value, onChange, data, title }: SortFilterSectionProps<T>) => {

	const onChoose = (id: number) => {
	 	const item = data.find((order) => order.id === id);

	 		if (!item) return;

			if (item.value === undefined) return;

			onChange(value === item.value ? undefined : item.value);

	 };

	return (
		<BaseFilterSection
			title={title}
			onClick={onChoose}
			data={data}
		/>
	)
}
