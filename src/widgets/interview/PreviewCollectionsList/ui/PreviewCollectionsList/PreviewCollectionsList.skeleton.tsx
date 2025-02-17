import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PreviewCollectionsItemSkeleton } from '@/entities/collection';

import { PreviewCollectionsListProps } from './PreviewCollectionsList';
import styles from './PreviewCollectionsList.module.css';

export const PreviewCollectionsListSkeleton = ({ className }: PreviewCollectionsListProps) => {
	return (
		<CardSkeleton
			className={className}
			title="title"
			actionTitle="actionTitle"
			actionRoute="actionRoute"
		>
			<Flex direction="column" gap="12" className={styles.list}>
				{[...Array(3)].map((_, index) => (
					<PreviewCollectionsItemSkeleton key={index} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
