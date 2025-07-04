import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { useAppSelector } from '@/shared/hooks';
import { BaseFilterSection } from '@/shared/ui/BaseFilterSection';

import { getFullProfile } from '@/entities/profile';

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
	const profile = useAppSelector(getFullProfile);

	const progressStatus: QuestionFilterStatusItem[] = [
		{ id: 'not-learned', title: t(Questions.STATUS_UNLEARNED) },
		{ id: 'learned', title: t(Questions.STATUS_LEARNED) },
		{ id: 'all', title: t(Questions.STATUS_ALL) },
		{ id: 'favorite', title: t(Questions.STATUS_FAVORITE) },
	];

	const preparedData = progressStatus.map((item) => ({
		...item,
		active: item.id === selectedStatus,
		disabled:
			profile.userRoles?.[0]?.name === 'candidate-free' &&
			(item.title === 'Не изучено' || item.title === 'Изучено'),
	}));

	return (
		<BaseFilterSection
			data={preparedData}
			title={t(Questions.STATUS_TITLE)}
			onClick={onChangeStatus}
		/>
	);
};
