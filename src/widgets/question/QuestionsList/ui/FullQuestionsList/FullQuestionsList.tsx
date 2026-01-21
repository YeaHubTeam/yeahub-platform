import { Accordion } from '@/shared/ui/Accordion';

import { Question } from '@/entities/question';

import { FullQuestionItem } from '../FullQuestionItem/FullQuestionItem';

import styles from './FullQuestionsList.module.css';

interface FullQuestionsListProps {
	questions: Question[];
	isPublic?: boolean;
	onMoveQuestionDetail: (id: number) => void;
}

export const FullQuestionsList = ({
	questions,
	isPublic,
	onMoveQuestionDetail,
}: FullQuestionsListProps) => {
	return (
		<>
			{questions.map((question) => (
				<Accordion key={question.id} title={question.title} className={styles.gap}>
					<FullQuestionItem
						question={question}
						isPublic={isPublic}
						onMoveQuestionDetail={onMoveQuestionDetail}
					/>
				</Accordion>
			))}
		</>
	);
};
