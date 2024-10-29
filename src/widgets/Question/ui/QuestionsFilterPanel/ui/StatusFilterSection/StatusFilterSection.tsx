import { i18Namespace } from '@/shared/config/i18n/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { QuestionFilterStatus, QuestionFilterStatusItem } from '../../model/types';

const reverseStatusMap: Record<number, QuestionFilterStatus> = {
	0: 'not-learned',
	1: 'learned',
	2: 'all',
};

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
		{ id: 0, title: t('status.unlearned') },
		{ id: 1, title: t('status.learned') },
		// { id: 'saved', title: 'Сохраненные' },
		{ id: 2, title: t('status.all') },
	];

	const preparedData = progressStatus.map((item) => ({
		...item,
		active: reverseStatusMap[item.id] === selectedStatus,
	}));

	const handleClick = (id: number) => {
		const status = reverseStatusMap[id];
		if (status) {
			onChangeStatus(status);
		}
	};

	return (
		<BaseFilterSection
			data={preparedData}
			title={t('status.title')}
			onClick={handleClick}
			showIcon={false}
		/>
	);
};
