import { BaseFilterSection } from '../BaseFilterSection/BaseFilterSection';

const progressStatus = [
	{ id: 1, title: 'Изученные' },
	{ id: 2, title: 'Неизученные' },
	{ id: 3, title: 'Сохраненные' },
	{ id: 4, title: 'Все' },
];

interface StatusFilterSectionProps {
	selectedStatuses?: number[];
	onChangeStatus: (status: number[]) => void;
}

export const StatusFilterSection = ({
	onChangeStatus,
	selectedStatuses,
}: StatusFilterSectionProps) => {
	const onClick = (id: number) => {
		const isDataExist = selectedStatuses?.some((item) => item === id);
		const updates = isDataExist
			? (selectedStatuses || []).filter((item) => item !== id)
			: [...(selectedStatuses || []), id];
		onChangeStatus(updates);
	};

	const preparedData = progressStatus.map((item) => ({
		...item,
		active: selectedStatuses?.some((selectedItem) => item.id === selectedItem),
	}));

	return <BaseFilterSection data={preparedData} title="Статус" onClick={onClick} />;
};
