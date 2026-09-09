import { QuestionsFiltersSkeleton } from '@/features/question/filterQuestions';

import { ListLayoutPageSkeleton } from '@/widgets/ListLayoutPage';
import { FullQuestionsListSkeleton } from '@/widgets/question/QuestionsList';

export const QuestionsPageSkeleton = () => {
	return (
		<ListLayoutPageSkeleton
			list={<FullQuestionsListSkeleton />}
			filters={<QuestionsFiltersSkeleton />}
			widthText={150}
		/>
	);
};
