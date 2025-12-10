import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PreviewQuestionsItemSkeleton } from '@/entities/question';

import { ITEMS_COUNT } from '../model/constants';

export const PopularQuestionsWidgetSkeleton = () => {
	return (
		<CardSkeleton actionRoute="actionRoute" title="title" size="medium" isActionPositionBottom>
			<Flex direction="column" gap="8">
				{[...Array(ITEMS_COUNT)].map((_, i) => (
					<PreviewQuestionsItemSkeleton key={i} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
