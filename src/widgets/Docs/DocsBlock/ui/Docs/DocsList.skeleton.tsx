import { Flex } from '@/shared/ui/Flex';

import { DocItemSkeleton } from '../DocItem/DocItem.skeleton';

import styles from './DocsList.module.css';

interface DocsListSkeletonProps {
	itemCount?: number;
}

export const DocsListSkeleton = ({ itemCount = 5 }: DocsListSkeletonProps) => {
	return (
		<div className={styles['docs']}>
			<Flex className={styles['docs-items']} direction="column" gap="40">
				{Array.from({ length: itemCount }).map((_, index) => (
					<DocItemSkeleton key={index} />
				))}
			</Flex>
		</div>
	);
};
