import { FC } from 'react';

import { Block } from '@/widgets/Block';
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
			<Block></Block>
		</div>
	);
};

export default InterviewPage;
