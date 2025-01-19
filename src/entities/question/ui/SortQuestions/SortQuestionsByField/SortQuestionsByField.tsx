import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

interface SortQuestionsByFieldProps {
	changeSortBy: (orderBy: string) => void;
	selectedOrderBy?: string;
}

export const SortQuestionsByField = ({
	changeSortBy,
	selectedOrderBy,
}: SortQuestionsByFieldProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const field = [
		{ id: 'title', title: t(Questions.TITLE_SHORT) },
		{ id: 'description', title: t(Questions.DESCRIPTION_TITLE) },
		{ id: 'complexity', title: t(Questions.COMPLEXITY_TITLE) },
		{ id: 'rate', title: t(Questions.RATE_TITLE) },
		{ id: 'keywords', title: t(Questions.KEYWORDS_TITLE) },
	];

	const handleSort = (id: string) => {
		const sortKey = selectedOrderBy === id ? '' : id;
		changeSortBy(sortKey);
	};

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrderBy === item.id,
	}));

	return (
		<BaseFilterSection data={preparedData} title={t(Questions.SORT_FIELD)} onClick={handleSort} />
	);
};
