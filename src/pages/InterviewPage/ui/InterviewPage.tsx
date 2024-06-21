import { FC } from 'react';

import { Block } from '@/shared/ui/Block';

import { InterviewHistoryHeader, InterviewHistoryList } from '@/widgets/InterviewHistory';
import { InterviewQuestionHeader, InterviewQuestionsList } from '@/widgets/InterviewQuestions';

import styles from './InterviewPage.module.css';

const InterviewPage: FC = () => {
	return (
		<div className={styles.container}>
			<Block></Block>
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
