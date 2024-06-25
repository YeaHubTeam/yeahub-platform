import { QUESTIONS_DATA } from '@/entities/interview';

import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

export const InterviewQuestionsList = () => {
	return (
		<ul className={styles.list}>
			{QUESTIONS_DATA.map((question) => (
				<InterviewQuestionsItem key={question.id} question={question} />
			))}
		</ul>
	);
};
