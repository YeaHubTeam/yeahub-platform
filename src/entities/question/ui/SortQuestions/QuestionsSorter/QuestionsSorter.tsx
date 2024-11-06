import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface QuestionsSorterProps {
	changeTheOrder: (order: string) => void;
	selectedOrder?: string;
}

export const QuestionsSorter = ({ changeTheOrder, selectedOrder }: QuestionsSorterProps) => {
	const { t } = useI18nHelpers(i18Namespace.questions);

	const field = [
		{ id: 'ASC', title: t('sort.ascending') },
		{ id: 'DESC', title: t('sort.descending') },
	];

	const handleSort = (id: string) => {
		const sortKey = selectedOrder === id ? '' : id;
		changeTheOrder(sortKey);
	};

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrder === item.id,
	}));

	return <BaseFilterSection data={preparedData} title={t('sort.title')} onClick={handleSort} />;
};
