import { Flex } from '@/shared/ui/Flex';
import { SearchInputSkeleton } from '@/shared/ui/SearchInput';

import { ChooseQuestionComplexitySkeleton } from '@/entities/question';
import { SkillsListFieldSkeleton } from '@/entities/skill';

import { QuestionRateFilterSkeleton } from '../QuestionRateFilter/QuestionRateFilter.skeleton';
import { QuestionStatusFilterSkeleton } from '../QuestionStatusFilter/QuestionStatusFilter.skeleton';

export const QuestionsFiltersSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<SearchInputSkeleton />
			<SkillsListFieldSkeleton />
			<ChooseQuestionComplexitySkeleton />
			<QuestionRateFilterSkeleton />
			<QuestionStatusFilterSkeleton />
		</Flex>
	);
};
