import { i18Namespace } from '@/shared/config/i18n/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
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
	const { t } = useI18nHelpers(i18Namespace.questions);

	const progressStatus: QuestionFilterStatusItem[] = [
		{ id: 'not-learned', title: t('status.unlearned') },
		{ id: 'learned', title: t('status.learned') },
		// { id: 'saved', title: 'Сохраненные' },
		{ id: 'all', title: t('status.all') },
	];

	const preparedData = progressStatus.map((item) => ({
		...item,
		active: item.id === selectedStatus,
	}));

	return (
		<BaseFilterSection data={preparedData} title={t('status.title')} onClick={onChangeStatus} />
	);
};
