import { Accordion } from '@/shared/ui/Accordion';

import { TestQuestion } from '@/entities/testQuestion';

import { FullTestQuestionItem } from '../FullTestQuestionItem/FullTestQuestionItem';

import styles from './FullTestQuestionsList.module.css';

interface FullTestQuestionsListProps {
	testQuestions: TestQuestion[];
	isPublic?: boolean;
	onMoveQuestionDetail: (id: number) => void;
}

export const FullTestQuestionsList = ({
	testQuestions,
	isPublic,
	onMoveQuestionDetail,
}: FullTestQuestionsListProps) => {
	return (
		<>
			{testQuestions.map((question) => {
				return (
					<Accordion key={question.id} title={question.title} className={styles.gap}>
						<FullTestQuestionItem
							testQuestion={question}
							isPublic={isPublic}
							onMoveQuestionDetail={onMoveQuestionDetail}
						/>
					</Accordion>
				);
			})}
		</>
	);
};
