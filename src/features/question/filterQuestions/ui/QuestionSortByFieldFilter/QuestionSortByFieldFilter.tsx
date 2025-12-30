import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionFilterOrderBy } from '@/entities/question';

interface QuestionSortByFieldFilterProps {
	onChangeOrderBy: (orderBy?: QuestionFilterOrderBy) => void;
	selectedOrderBy?: QuestionFilterOrderBy;
}

export const QuestionSortByFieldFilter = ({
	onChangeOrderBy,
	selectedOrderBy,
}: QuestionSortByFieldFilterProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const field: BaseFilterItem<QuestionFilterOrderBy>[] = [
		{ id: 'title', title: t(Questions.TITLE_SHORT) },
		{ id: 'complexity', title: t(Questions.COMPLEXITY_TITLE) },
		{ id: 'rate', title: t(Questions.RATE_TITLE) },
	];

	const preparedData = field.map((item) => ({
		...item,
		active: selectedOrderBy === item.id,
	}));

	const onChangeOrder = (orderBy: QuestionFilterOrderBy) => {
		onChangeOrderBy(orderBy === selectedOrderBy ? undefined : orderBy);
	};

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Questions.SORT_FIELD)}
			onClick={onChangeOrder}
		/>
	);
};
