import { Accordion } from '@/shared/ui/Accordion';

import { Question } from '@/entities/question';

interface QuestionsListProps {
	questions?: Question[];
	profileId: string;
}

import { QuestionPreview } from '../QuestionPreview/QuestionPreview';

import styles from './QuestionsSummaryList.module.css';

export const QuestionsSummaryList = ({ questions, profileId }: QuestionsListProps) => {
	return (
		<>
			<h1 className={styles.title}>Вопросы</h1>
			<hr className={styles.divider} />
			{questions &&
				questions.map((question) => {
					return (
						<Accordion key={question.id} title={question.title}>
							<QuestionPreview question={question} profileId={profileId} />
						</Accordion>
					);
				})}
		</>
	);
};
