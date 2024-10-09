import { i18Namespace } from '@/shared/config/i18n';
import { Interview } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';

import { useProfileQuery } from '@/entities/auth';
import { useGetQuestionsListQuery } from '@/entities/question';

import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

export const InterviewQuestionsList = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);
	const { data: profile } = useProfileQuery();

	const specializationId = profile?.profiles[0].specializationId;

	const params = {
		random: true,
		limit: 3,
		specialization: specializationId,
	};

	const { data: response, isSuccess } = useGetQuestionsListQuery(params);

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	if (isEmptyData) {
		return <h3 className={styles['no-questions']}>{t(Interview.QUESTIONS_EMPTY)}</h3>;
	}

	return (
		<Card
			className={styles.questions}
			title={t('questions.title')}
			actionTitle={t('questions.studied')}
			actionRoute={ROUTES.interview.questions.page}
			withShadow
		>
			<ul className={styles.list}>
				{questions.map((question) => (
					<InterviewQuestionsItem key={question.id} question={question} />
				))}
			</ul>
		</Card>
	);
};
