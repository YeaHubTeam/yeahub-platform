import { i18Namespace } from '@/shared/config/i18n';
import { useI18nHelpers } from '@/shared/hooks/useI18nHelpers';
import { Block } from '@/shared/ui/Block';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import {
	PassedInterviewStat,
	PassedQuestionChart,
	ProgressByCategoriesList,
} from '@/widgets/Charts';
import { InterviewQuestionHeader } from '@/widgets/InterviewQuestions';

import styles from './InterviewStatisticsPage.module.css';

const InterviewStatisticsPage = () => {
	const { t } = useI18nHelpers(i18Namespace.interviewStatistics);
	const questionStats = [
		{
			title: t('questionStats.passedQuestions', 'Пройдено вопросов'),
			value: '20/120',
		},
		{
			title: t('questionStats.notStudied', 'Не изучено'),
			value: '50',
		},
		{
			title: t('questionStats.saved', 'Сохранено'),
			value: '60',
		},
		{
			title: t('questionStats.studied', 'Изучено'),
			value: '20',
		},
	];

	const attemptStats = [
		{
			value: 60,
			name: t('attemptStats.bestResult', 'Лучший результат'),
			itemStyle: { color: '#400799' },
		},
		{
			value: 40,
			name: t('attemptStats.worstResult', 'Худший результат'),
			itemStyle: { color: '#E1CEFF' },
		},
		{
			value: 55,
			name: t('attemptStats.avgResult', 'Средний результат'),
			itemStyle: { color: '#6A0BFF' },
		},
	];

	const progressData = [
		{
			category: 'React',
			passed: 80,
			total: 120,
			value: (80 / 120) * 100,
		},
		{
			category: 'Javascript',
			passed: 90,
			total: 200,
			value: (90 / 200) * 100,
		},
		{
			category: 'PHP',
			passed: 50,
			total: 150,
			value: (50 / 150) * 100,
		},
		{
			category: 'Redux',
			passed: 100,
			total: 150,
			value: (100 / 150) * 100,
		},
		{
			category: 'Typescript',
			passed: 90,
			total: 200,
			value: (90 / 200) * 100,
		},
		{
			category: 'CSS',
			passed: 50,
			total: 150,
			value: (50 / 150) * 100,
		},
		{
			category: 'HTML',
			passed: 80,
			total: 120,
			value: (80 / 120) * 100,
		},
	];

	return (
		<div className={styles.container}>
			<Block>
				<div className={styles.attempt}>
					<InterviewQuestionHeader
						title={t('attemptStats.title', 'Статистика пройденных собеседований')}
						centered
					/>
					<PassedInterviewStat totalAttempt={40} attemptData={attemptStats} />
				</div>
			</Block>
			<div className={styles.progress}>
				<Block className={styles.block}>
					<div className={styles.questions}>
						<InterviewQuestionHeader
							title={t('questionStats.title', 'Статистика пройденных вопросов по всем категориям')}
							centered
						/>
						<PassedQuestionChart total={120} learned={20} />
					</div>
				</Block>
				<PassedQuestionStatInfo stats={questionStats} />
			</div>
			<Block></Block>
			<Block className={styles.category} expandable>
				<div className={styles['category-progress']}>
					<InterviewQuestionHeader title={t('progress.title', 'Прогресс')} />
					<ProgressByCategoriesList optionData={progressData} />
				</div>
			</Block>
		</div>
	);
};

export default InterviewStatisticsPage;
