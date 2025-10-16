import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { MostDifficultQuestionsResponse } from '../../model/types/question';
import MostDifficultQuestion from '../MostDifficultQuestion/MostDifficultQuestion';

export const MostDifficultQuestions = ({
	difficultQuestions,
}: {
	difficultQuestions?: MostDifficultQuestionsResponse;
}) => {
	const { isSmallScreen } = useScreenSize();

	const mixedQuestions =
		difficultQuestions && [...difficultQuestions.topStat].sort(() => Math.random() - 0.5);

	const filteredQuestions = isSmallScreen ? mixedQuestions?.slice(3) : mixedQuestions?.slice(0, 6);

	return (
		<Flex direction="column" gap="12">
			{filteredQuestions?.map((question) => (
				<MostDifficultQuestion key={question.questionId} question={question} />
			))}
		</Flex>
	);
};
