import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PreviewQuestionsItemSkeleton } from '@/entities/question';

const QUESTIONS_COUNT = 3;

export const PopularQuestionsWidgetSkeleton = () => {
	return (
		<CardSkeleton actionRoute="actionRoute" title="title" size="medium" isActionPositionBottom>
			<Flex direction="column" gap="8">
				{[...Array(QUESTIONS_COUNT)].map((_, i) => (
					<PreviewQuestionsItemSkeleton key={i} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
