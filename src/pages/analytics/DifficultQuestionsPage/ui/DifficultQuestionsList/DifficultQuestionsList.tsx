import { Flex } from '@/shared/ui/Flex';

import { MostDifficultQuestionMobile, TopStat } from '@/entities/question';

interface MostDifficultQuestionsMobileProps {
	difficultQuestions: TopStat[];
}
export const DifficultQuestionsList = ({
	difficultQuestions,
}: MostDifficultQuestionsMobileProps) => {
	return (
		<Flex direction="column" gap="20">
			{difficultQuestions.map((difficultQuestion) => {
				return (
					<MostDifficultQuestionMobile
						key={difficultQuestion.questionId}
						title={difficultQuestion.title}
						stat={difficultQuestion.stat}
						answersCount={difficultQuestion.answersCount}
					/>
				);
			})}
		</Flex>
	);
};
