import { InterviewQuestion } from '@/entities/interview';

import { PassedQuestionsItem } from '../PassedQuestionsItem/PassedQuestionsItem';

import styles from './PassedQuestionsList.module.css';

interface Props {
	questions: InterviewQuestion[];
}

export const PassedQuestionsList = ({ questions }: Props) => {
	return (
		<ul className={styles.list}>
			{questions.map((question) => (
				<PassedQuestionsItem key={question.id} question={question} />
			))}
		</ul>
	);
};
