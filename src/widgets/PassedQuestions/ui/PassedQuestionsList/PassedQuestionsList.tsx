import { InterviewQuestion } from '@/entities/quiz';

import { PassedQuestionsItem } from '../PassedQuestionsItem/PassedQuestionsItem';

import styles from './PassedQuestionsList.module.css';

interface PassedQuestionsListProps {
	questions: InterviewQuestion[];
}

export const PassedQuestionsList = ({ questions }: PassedQuestionsListProps) => {
	return (
		<ul className={styles.list}>
			{questions.map((question) => (
				<PassedQuestionsItem key={question.id} question={question} />
			))}
		</ul>
	);
};
