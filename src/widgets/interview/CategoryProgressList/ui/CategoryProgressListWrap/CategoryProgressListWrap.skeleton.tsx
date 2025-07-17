import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CategoryProgressItemSkeleton } from '../CategoryProgressItem/CategoryProgressItem.skeleton';

import { CategoryProgressListWrapProps } from './CategoryProgressListWrap';

export const CategoryProgressListWrapSkeleton = ({ className }: CategoryProgressListWrapProps) => {
	return (
		<CardSkeleton withShadow title="title" className={className}>
			<Flex direction="column" gap="12">
				{[...Array(7)].map((_, i) => (
					<CategoryProgressItemSkeleton key={i} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
