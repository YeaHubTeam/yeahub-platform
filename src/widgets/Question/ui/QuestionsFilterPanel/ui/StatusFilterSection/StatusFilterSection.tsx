import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Questions, Translation } from '@/shared/config/i18n/i18nTranslations';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionFilterStatus, QuestionFilterStatusItem } from '../../model/types';

const progressStatus: QuestionFilterStatusItem[] = [
	{ id: 'not-learned', title: i18n.t(Translation.QUESTIONS_NOTLEARNED) },
	{ id: 'learned', title: i18n.t(Translation.QUESTIONS_LEARNED) },
	// { id: 'saved', title: 'Сохраненные' },
	{ id: 'all', title: i18n.t(Translation.QUESTIONS_ALL) },
];

interface StatusFilterSectionProps {
	selectedStatus?: QuestionFilterStatus;
	onChangeStatus: (status: QuestionFilterStatus) => void;
}

export const StatusFilterSection = ({
	onChangeStatus,
	selectedStatus,
}: StatusFilterSectionProps) => {
	const { t } = useI18nHelpers(i18Namespace.questions);
	const preparedData = progressStatus.map((item) => ({
		...item,
		active: item.id === selectedStatus,
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Questions.STATUS_TITLE)}
			onClick={onChangeStatus}
		/>
	);
};
