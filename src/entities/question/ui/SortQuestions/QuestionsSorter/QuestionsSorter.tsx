import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface QuestionsSorterProps {
	changeTheOrder: (order: string) => void;
	selectedOrder?: string;
}

export const QuestionsSorter = ({ changeTheOrder, selectedOrder }: QuestionsSorterProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const field = [
		{ id: 'ASC', title: t(Questions.SORT_ASCENDING) },
		{ id: 'DESC', title: t(Questions.SORT_DESCENDING) },
	];

	const handleSort = (id: string) => {
		const sortKey = selectedOrder === id ? '' : id;
		changeTheOrder(sortKey);
	};

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrder === item.id,
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(Questions.SORT_TITLE)} onClick={handleSort} />
	);
};
