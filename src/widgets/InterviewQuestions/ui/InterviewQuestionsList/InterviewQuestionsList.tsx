import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Questions } from '@/shared/config/i18n/i18nTranslations';
import { ROUTES } from '@/shared/config/router/routes';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Card } from '@/shared/ui/Card';

import { getSpecializationId } from '@/entities/profile';
import { useGetQuestionsListQuery } from '@/entities/question';

import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

export const InterviewQuestionsList = () => {
	const { t } = useTranslation(i18Namespace.questions);

	const specializationId = useAppSelector(getSpecializationId);

	const { data: response, isSuccess } = useGetQuestionsListQuery({
		random: true,
		limit: 3,
		specialization: specializationId,
	});

	const questions = response?.data ?? [];

	const isEmptyData = isSuccess && questions.length === 0;

	if (isEmptyData) {
		return <h3 className={styles['no-questions']}>{t(Questions.PREVIEW_EMPTY)}</h3>;
	}

	return (
		<Card
			className={styles.questions}
			title={t(Questions.PREVIEW_TITLE)}
			actionTitle={t(Questions.PREVIEW_LINK)}
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
