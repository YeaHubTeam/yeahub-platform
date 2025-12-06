import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions, Subscription } from '@/shared/config';
import { useAppSelector } from '@/shared/libs';
import { BaseFilterItem, BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getHasPremiumAccess } from '@/entities/profile';
import { QuestionFilterStatus } from '@/entities/question';

interface QuestionStatusFilterProps {
	selectedStatus?: QuestionFilterStatus;
	onChangeStatus: (status: QuestionFilterStatus) => void;
}

export const QuestionStatusFilter = ({
	onChangeStatus,
	selectedStatus,
}: QuestionStatusFilterProps) => {
	const { t } = useTranslation([i18Namespace.questions, i18Namespace.subscription]);
	const hasPremium = useAppSelector(getHasPremiumAccess);

	const progressStatus: BaseFilterItem<QuestionFilterStatus>[] = [
		{
			id: 'not-learned',
			title: t(Questions.STATUS_UNLEARNED),
			tooltip: t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription }),
			disabled: !hasPremium,
		},
		{
			id: 'learned',
			title: t(Questions.STATUS_LEARNED),
			tooltip: t(Subscription.CHANGE_TARIFF_PLAN, { ns: i18Namespace.subscription }),
			disabled: !hasPremium,
		},
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
