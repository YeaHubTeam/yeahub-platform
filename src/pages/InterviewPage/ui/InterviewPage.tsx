import { FC } from 'react';

import { Block } from '@/shared/ui/Block';

import { QuestionProgressBar } from '@/entities/interview';

import { InterviewHistoryHeader, InterviewHistoryList } from '@/widgets/InterviewHistory';
import { InterviewPreparationHeader } from '@/widgets/InterviewPreparation';
import { QuestionSlider } from '@/widgets/InterviewPreparation';
import { InterviewQuestionHeader, InterviewQuestionsList } from '@/widgets/InterviewQuestions';

import styles from './InterviewPage.module.css';

const InterviewPage: FC = () => {
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
			<Block></Block>
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
