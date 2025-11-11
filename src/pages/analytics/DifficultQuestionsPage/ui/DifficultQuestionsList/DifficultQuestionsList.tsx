import { Flex } from '@/shared/ui/Flex';

import { TopStat } from '@/entities/question';

import { DifficultQuestionMobile } from '../DifficultQuestionMobile/DifficultQuestionMobile';

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
					<DifficultQuestionMobile
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
