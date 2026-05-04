import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { StatusChip, type StatusChipVariant } from '@/shared/ui/StatusChip';

import { StudyStatus } from '../../lib/getStudyStatus';

interface QuestionStudyStatusProps {
	status: StudyStatus;
}

export const QuestionStudyStatus = ({ status }: QuestionStudyStatusProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const variantMap: Record<StudyStatus, StatusChipVariant> = {
		learned: 'green',
		'in-progress': 'yellow',
		'not-learned': 'red',
	};

	const labels = {
		learned: t(Questions.STUDY_STATUS_LEARNED),
		'in-progress': t(Questions.STUDY_STATUS_IN_PROGRESS),
		'not-learned': t(Questions.STUDY_STATUS_NOT_LEARNED),
	};

	return (
		<StatusChip
			status={{
				text: labels[status],
				variant: variantMap[status],
			}}
			size="small"
		/>
	);
};
