import { Flex } from '@/shared/ui/Flex';

import { TopStat } from '../../model/types/question';
import { MostDifficultQuestionMobile } from '../MostDifficultQuestionMobile/MostDifficultQuestionMobile';

interface MostDifficultQuestionsMobileProps {
	difficultQuestions: TopStat[];
}
export const MostDifficultQuestionsMobile = ({
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
