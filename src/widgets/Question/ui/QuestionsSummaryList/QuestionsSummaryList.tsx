import { Accordion } from '@/shared/ui/Accordion';

import { Question, QuestionPreview } from '@/entities/question';

interface QuestionsListProps {
	questions?: Question[];
}

export const QuestionsSummaryList = ({ questions }: QuestionsListProps) => {
	return (
		<>
			<h1>Вопросы React, JS555</h1>
			<hr />
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
