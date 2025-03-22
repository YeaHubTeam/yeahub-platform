import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { StatusChip, StatusChipItem } from '@/shared/ui/StatusChip';

import { QuestionStatus } from '@/entities/question';

interface QuestionStatusChipProps {
	status: QuestionStatus;
}

export const QuestionStatusChip = ({ status }: QuestionStatusChipProps) => {
	const { t } = useTranslation(i18Namespace.questions);

	const questionStatuses: Record<QuestionStatus, StatusChipItem> = {
		public: {
			text: t(Questions.STATUS_PUBLIC),
			variant: 'green',
		},
		draft: {
			text: t(Questions.STATUS_DRAFT),
			variant: 'yellow',
		},
	};

	return <StatusChip status={questionStatuses[status]} />;
};
