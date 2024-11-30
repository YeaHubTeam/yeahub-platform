import i18n, { i18Namespace } from '@/shared/config/i18n/i18n';
import { Translation } from '@/shared/config/i18n/i18nTranslations';

import { QuestionStatus } from '@/entities/question';

export const questionStatusesItems: { label: string; value: QuestionStatus }[] = [
	{
		label: i18n.t(Translation.QUESTION_STATUS_PUBLIC, { ns: i18Namespace.translation }),
		value: 'public',
	},
	{
		label: i18n.t(Translation.QUESTION_STATUS_DRAFT, { ns: i18Namespace.translation }),
		value: 'draft',
	},
];

export const questionStatuses: Record<QuestionStatus, string> = {
	public: i18n.t(Translation.QUESTION_STATUS_PUBLIC, { ns: i18Namespace.translation }),
	draft: i18n.t(Translation.QUESTION_STATUS_DRAFT, { ns: i18Namespace.translation }),
};
