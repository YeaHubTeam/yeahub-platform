import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { CategoryProgressItemSkeleton } from '../CategoryProgressItem/CategoryProgressItem.skeleton';

import { CategoryProgressListProps } from './CategoryProgressList';
import styles from './CategoryProgressList.module.css';

export const CategoryProgressListSkeleton = ({ className }: CategoryProgressListProps) => {
	return (
		<CardSkeleton className={className} title="title">
			<Flex direction="column" gap="12" className={styles.list}>
				{[...Array(4)].map((_, i) => (
					<CategoryProgressItemSkeleton key={i} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
