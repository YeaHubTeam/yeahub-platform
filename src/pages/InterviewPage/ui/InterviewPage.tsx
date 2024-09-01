import { i18Namespace } from '@/shared/config/i18n';
import { ROUTES } from '@/shared/config/router/routes';
import { getFromLS } from '@/shared/helpers/manageLocalStorage';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { LS_START_DATE_QUIZ_KEY } from '@/entities/quiz';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryHeader, InterviewHistoryList } from '@/widgets/InterviewHistory';
import { QuestionProgressBarBlock } from '@/widgets/InterviewPreparation';
import { InterviewPreparationHeader } from '@/widgets/InterviewPreparation';
import { QuestionSlider } from '@/widgets/InterviewPreparation';
import { InterviewQuestionHeader, InterviewQuestionsList } from '@/widgets/InterviewQuestions';

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
			<Block>
				<div className={styles.preparation}>
					<InterviewPreparationHeader title={t('preparation.title')} />
					<LinkWithArrowRight
						link={isActiveQuizExist ? ROUTES.interview.quiz.new.page : ROUTES.interview.quiz.page}
						linkTitle={t('preparation.linkText')}
					/>
					<div className={styles['preparation-wrapper']}>
						<QuestionProgressBarBlock />
						<QuestionSlider />
					</div>
				</div>
			</Block>
			<Block>
				<div className={styles.statistics}>
					<InterviewQuestionHeader title={t('stats.title')} />
					<PassedQuestionChart total={120} learned={20} />
					<PassedQuestionStatInfo stats={questionStats} />
					<LinkWithArrowRight
						link={ROUTES.interview.statistic.page}
						linkTitle={t('stats.linkText')}
					/>
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewQuestionHeader
						title={t('questions.title')}
						linkTitle={t('questions.studied', 'Изучить')}
					/>
					<LinkWithArrowRight
						link={ROUTES.interview.questions.page}
						linkTitle={t('questions.studied')}
					/>
					<InterviewQuestionsList />
				</div>
			</Block>
			<Block>
				<div className={styles.history}>
					<InterviewHistoryHeader title={t('history_preparation.title')} />
					<LinkWithArrowRight
						link={ROUTES.interview.history.page}
						linkTitle={t('history_preparation.linkText')}
					/>
					<InterviewHistoryList />
				</div>
			</Block>
		</div>
	);
};

export default InterviewPage;
