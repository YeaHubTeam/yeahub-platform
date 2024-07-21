import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

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

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles.questions}>
					<InterviewPreparationHeader
						title={t('preparation.title', 'Подготовка к собеседованиям')}
						linkTitle={t('preparation.linkText', 'Пройти собеседование')}
					/>
					<div className={styles['preparation-wrapper']}>
						<QuestionProgressBarBlock />
						<QuestionSlider />
					</div>
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewQuestionHeader title={t('stats.title', 'Статистика собеседований')} />
					<PassedQuestionChart total={120} learned={20} />
					<PassedQuestionStatInfo stats={questionStats} />
					<LinkWithArrowRight
						link="/interview-statistics"
						linkTitle={t('stats.linkText', 'Посмотреть полностью')}
					/>
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewQuestionHeader
						title={t('questions.title', 'Статистика собеседований')}
						linkTitle={t('questions.studied', 'Изучить')}
					/>
					<InterviewQuestionsList />
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewHistoryHeader
						title={t('history_preparation.title', 'История собеседований')}
						linkTitle={t('history_preparation.linkText', 'Подробнее')}
					/>
					<InterviewHistoryList />
				</div>
			</Block>
		</div>
	);
};

export default InterviewPage;
