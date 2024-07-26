import { Accordion } from '@/shared/ui/Accordion';

import { Question, QuestionPreview } from '@/entities/question';

interface QuestionsListProps {
	questions?: Question[];
}

import styles from './QuestionsSummaryList.module.css';

export const QuestionsSummaryList = ({ questions }: QuestionsListProps) => {
	return (
		<>
			<h1 className={styles.title}>Вопросы React, JS555</h1>
			<hr className={styles.divider} />
			{questions &&
				questions.map((question) => {
					return (
						<Accordion key={question.id} title={question.title}>
							<QuestionPreview question={question} />
						</Accordion>
					);
				})}
		</>
	);
};
