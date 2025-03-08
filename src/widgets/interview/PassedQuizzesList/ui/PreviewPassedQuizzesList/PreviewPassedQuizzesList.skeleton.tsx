import { useScreenSize } from '@/shared/hooks/useScreenSize';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PreviewPassedQuizzesItemSkeleton } from '../PreviewPassedQuizzesItem/PreviewPassedQuizzesItem.skeleton';

import { InterviewHistoryListProps } from './PreviewPassedQuizzesList';
import styles from './PreviewPassedQuizzesList.module.css';

export const PreviewPassedQuizzesListSkeleton = ({ className }: InterviewHistoryListProps) => {
	const { isMobile } = useScreenSize();

	return (
		<CardSkeleton
			className={className}
			actionRoute="actionRoute"
			actionTitle="actionTitle"
			title="title"
			withShadow
			isTitleCenter={isMobile}
		>
			<Flex componentType="ul" direction="column" gap="8" className={styles.list}>
				{[...Array(5)].map((_, index) => (
					<PreviewPassedQuizzesItemSkeleton key={index} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
