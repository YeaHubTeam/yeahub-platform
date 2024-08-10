import { INTERVIEW_QUESTIONS } from '@/entities/quiz';

import { InterviewQuestionsItem } from '../InterviewQuestionsItem/InterviewQuestionsItem';

import styles from './InterviewQuestionsList.module.css';

export const InterviewQuestionsList = () => {
	return (
		<ul className={styles.list}>
			{INTERVIEW_QUESTIONS.map((question) => (
				<InterviewQuestionsItem key={question.id} question={question} />
			))}
		</ul>
	);
};
