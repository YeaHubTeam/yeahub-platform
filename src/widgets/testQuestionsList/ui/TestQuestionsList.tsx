import { Accordion } from '@/shared/ui/Accordion';

import { QuestionStudyStatus } from '@/entities/question';
import { TestQuestion } from '@/entities/testQuestion';

import { TestQuestionItem } from './TestQuestionItem/TestQuestionItem';
import styles from './TestQuestionsList.module.css';

const isStudyStatusEnabled = false;

interface TestQuestionsListProps {
	testQuestions: TestQuestion[];
}

export const TestQuestionsList = ({ testQuestions }: TestQuestionsListProps) => {
	return (
		<>
			{testQuestions.map((testQuestion) => (
				<Accordion
					key={testQuestion.id}
					prefix={isStudyStatusEnabled ? <QuestionStudyStatus status="not-learned" /> : undefined}
					title={testQuestion.title}
					className={styles.gap}
				>
					<TestQuestionItem testQuestion={testQuestion} />
				</Accordion>
			))}
		</>
	);
};
