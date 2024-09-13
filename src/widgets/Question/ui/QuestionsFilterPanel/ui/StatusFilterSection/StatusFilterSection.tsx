import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionFilterStatus, QuestionFilterStatusItem } from '../../model/types';

const progressStatus: QuestionFilterStatusItem[] = [
	{ id: 'not-learned', title: 'Изученные' },
	{ id: 'learned', title: 'Неизученные' },
	// { id: 'saved', title: 'Сохраненные' },
	{ id: 'all', title: 'Все' },
];

interface StatusFilterSectionProps {
	selectedStatus?: QuestionFilterStatus;
	onChangeStatus: (status: QuestionFilterStatus) => void;
}

export const StatusFilterSection = ({
	onChangeStatus,
	selectedStatus,
}: StatusFilterSectionProps) => {
	const preparedData = progressStatus.map((item) => ({
		...item,
		active: item.id === selectedStatus,
	}));

	return <BaseFilterSection data={preparedData} title="Статус" onClick={onChangeStatus} />;
};
