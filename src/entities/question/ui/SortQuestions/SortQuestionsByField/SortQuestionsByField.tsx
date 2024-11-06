import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface SortQuestionsByFieldProps {
	changeSortBy: (orderBy: string) => void;
	selectedOrderBy?: string;
}

export const SortQuestionsByField = ({
	changeSortBy,
	selectedOrderBy,
}: SortQuestionsByFieldProps) => {
	const { t } = useI18nHelpers(i18Namespace.questions);

	const field = [
		{ id: 'title', title: t('name') },
		{ id: 'description', title: t('description.title') },
		{ id: 'complexity', title: t('field.complexity') },
		{ id: 'rate', title: t('field.rate') },
		{ id: 'keywords', title: t('keywords') },
	];

	const handleSort = (id: string) => {
		const sortKey = selectedOrderBy === id ? '' : id;
		changeSortBy(sortKey);
	};

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrderBy === item.id,
	}));

	return <BaseFilterSection data={preparedData} title={t('field.title')} onClick={handleSort} />;
};
