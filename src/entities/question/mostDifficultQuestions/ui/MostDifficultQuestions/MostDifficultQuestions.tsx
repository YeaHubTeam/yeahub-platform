import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { useGetMostDifficultQuestionsBySpecializationIdQuery } from '../../api/mostDifficultQuestionsApi';
import MostDifficultQuestion from '../MostDifficultQuestion/MostDifficultQuestion';

export const MostDifficultQuestions = ({ specializationId }: { specializationId: number }) => {
	const { data: difficultQuestions } = useGetMostDifficultQuestionsBySpecializationIdQuery({
		specId: specializationId,
	});
	const { isSmallScreen } = useScreenSize();

	// const mixedQuestions = difficultQuestions?.topStat.sort(() => Math.random() - 0.5);

	const filteredQuestions = isSmallScreen
		? difficultQuestions?.topStat.slice(3)
		: difficultQuestions?.topStat.slice(0, 6);

	return (
		<Flex direction="column" gap="12">
			<MostDifficultQuestion questions={filteredQuestions} />
		</Flex>
	);
};
