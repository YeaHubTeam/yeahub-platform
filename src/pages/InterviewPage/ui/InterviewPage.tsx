import { FC } from 'react';

import { Block } from '@/shared/ui/Block';
import { LinkWithArrowRight } from '@/shared/ui/LinkWithArrowRight';
import { PassedQuestionStatInfo } from '@/shared/ui/PassedQuestionStatInfo';

import { QuestionProgressBar } from '@/entities/interview';

import { PassedQuestionChart } from '@/widgets/Charts';
import { InterviewHistoryHeader, InterviewHistoryList } from '@/widgets/InterviewHistory';
import { InterviewPreparationHeader } from '@/widgets/InterviewPreparation';
import { QuestionSlider } from '@/widgets/InterviewPreparation';
import { InterviewQuestionHeader, InterviewQuestionsList } from '@/widgets/InterviewQuestions';

import styles from './InterviewPage.module.css';

const InterviewPage: FC = () => {
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
						title="Подготовка к собеседованиям"
						linkTitle="Пройти собеседование"
					/>
					<div className={styles['preparation-wrapper']}>
						<QuestionProgressBar />
						<QuestionSlider />
					</div>
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewQuestionHeader title="Статистика собеседований" />
					<PassedQuestionChart total={120} learned={20} />
					<PassedQuestionStatInfo stats={questionStats} />
					<LinkWithArrowRight link="/interview-statistics" linkTitle="Посмотреть полностью" />
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewQuestionHeader title="Список вопросов" linkTitle="Изучить" />
					<InterviewQuestionsList />
				</div>
			</Block>
			<Block>
				<div className={styles.questions}>
					<InterviewHistoryHeader title="История собеседований" linkTitle="Подробнее" />
					<InterviewHistoryList />
				</div>
			</Block>
		</div>
	);
};

export default InterviewPage;
