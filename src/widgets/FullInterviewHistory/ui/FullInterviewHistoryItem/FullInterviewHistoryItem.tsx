import { Link } from 'react-router-dom';

import { Block } from '@/shared/ui/Block';

import { QuestionCategories, type Interview } from '@/entities/interview';

import styles from './FullInterviewHistoryItem.module.css';
import { InterviewHeader } from './InterviewHeader/InterviewHeader';
import { InterviewParameters } from './InterviewParameters/InterviewParameters';

interface Props {
	interview: Interview;
}

export const FullInterviewHistoryItem = ({ interview }: Props) => {
	const { title, questionCategories } = interview;

	return (
		<li>
			<Link to="/interview/interviewHistory/interviewQuizResult">
				<Block className={styles.container}>
					<InterviewHeader title={title} />
					<InterviewParameters interview={interview} />
					{questionCategories && <QuestionCategories questionCategories={questionCategories} />}
				</Block>
			</Link>
		</li>
	);
};
