import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Card } from '@/shared/ui/Card';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { LS_START_DATE_QUIZ_KEY } from '@/entities/quiz';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryList } from '@/widgets/InterviewHistory';
import { QuestionSlider } from '@/widgets/InterviewPreparation';
import { QuestionProgressBarBlock } from '@/widgets/InterviewPreparation';
import { InterviewQuestionsList } from '@/widgets/InterviewQuestions';

import styles from './InterviewPage.module.css';

const InterviewPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interview);

	const questionStats = [
		{
			title: 'Всего вопросов',
			value: '120',
		},
		{
			title: 'Не изучено',
			value: '40',
		},
		{
			title: 'Изучено',
			value: '20',
		},
	];

	const isActiveQuizExist = !!getFromLS(LS_START_DATE_QUIZ_KEY);

	return (
		<div className={styles.container}>
			<Card
				title={t('preparation.title')}
				actionTitle={t('preparation.linkText')}
				actionRoute={
					isActiveQuizExist ? ROUTES.interview.quiz.new.page : ROUTES.interview.quiz.page
				}
				withShadow
			>
				<div className={styles.preparation}>
					<div className={styles['preparation-wrapper']}>
						<QuestionProgressBarBlock />
						<QuestionSlider />
					</div>
				</div>
			</Card>
			<Card
				isActionPositionBottom
				title={t('stats.title')}
				actionTitle={t('stats.linkText')}
				actionRoute={ROUTES.interview.statistic.page}
			>
				<div className={styles.statistics}>
					<PassedQuestionChart total={120} learned={20} />
					<PassedQuestionStatInfo stats={questionStats} />
				</div>
			</Card>
			<Card
				title={t('questions.title')}
				actionTitle={t('questions.studied')}
				actionRoute={ROUTES.interview.questions.page}
				withShadow
			>
				<div className={styles.questions}>
					<InterviewQuestionsList />
				</div>
			</Card>
			<Card
				actionRoute={ROUTES.interview.history.page}
				actionTitle={t('history_preparation.linkText')}
				title={t('history_preparation.title')}
				withShadow
			>
				<div className={styles.history}>
					<InterviewHistoryList />
				</div>
			</Card>
		</div>
	);
};

export default InterviewPage;
