import { useScreenSize } from '@/shared/libs';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PreviewPassedTestsItemSkeleton } from '../PreviewPassedTestsItem/PreviewPassedTestsItem.skeleton';

import styles from './PreviewPassedTestsList.module.css';

export const PreviewPassedTestsListSkeleton = ({ className }: { className?: string }) => {
	const { isMobile } = useScreenSize();

	return (
		<CardSkeleton
			className={className}
			actionRoute="actionRoute"
			actionTitle="actionTitle"
			title="title"
			isTitleCenter={isMobile}
		>
			<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
				{[...Array(3)].map((_, index) => (
					<PreviewPassedTestsItemSkeleton key={index} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
