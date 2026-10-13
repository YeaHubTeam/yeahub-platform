import { useTranslation } from 'react-i18next';

import { i18Namespace, Questions } from '@/shared/config';
import { StatusChip, type StatusChipVariant } from '@/shared/ui/StatusChip';

import { StudyStatus } from '../../lib/getStudyStatus';

interface QuestionStudyStatusProps {
	status: StudyStatus;
}

const variantMap: Record<StudyStatus, StatusChipVariant> = {
	learned: 'green',
	'in-progress': 'yellow',
	'not-learned': 'red',
};

const labels: Record<StudyStatus, string> = {
	learned: Questions.STUDY_STATUS_LEARNED,
	'in-progress': Questions.STUDY_STATUS_IN_PROGRESS,
	'not-learned': Questions.STUDY_STATUS_NOT_LEARNED,
};

export const QuestionStudyStatus = ({ status }: QuestionStudyStatusProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	return (
		<StatusChip
			status={{
				text: t(labels[status]),
				variant: variantMap[status],
			}}
			size="small"
		/>
	);
};
