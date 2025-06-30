import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionFilterStatus, QuestionFilterStatusItem } from '../../model/types';
interface StatusFilterSectionProps {
	selectedStatus?: QuestionFilterStatus;
	onChangeStatus: (status: QuestionFilterStatus) => void;
}

export const StatusFilterSection = ({
	onChangeStatus,
	selectedStatus,
}: StatusFilterSectionProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const progressStatus: QuestionFilterStatusItem[] = [
		{ id: 'not-learned', title: t(Questions.STATUS_UNLEARNED) },
		{ id: 'learned', title: t(Questions.STATUS_LEARNED) },
		{ id: 'all', title: t(Questions.STATUS_ALL) },
		{ id: 'favorite', title: t(Questions.STATUS_FAVORITE) },
	];

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
