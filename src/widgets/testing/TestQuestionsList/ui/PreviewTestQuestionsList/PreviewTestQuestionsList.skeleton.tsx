import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { PreviewListItemSkeleton } from '@/shared/ui/PreviewListItem';

import { PreviewTestQuestionsListProps } from './PreviewTestQuestionsList';
import styles from './PreviewTestQuestionsList.module.css';

export const PreviewTestQuestionsListSkeleton = ({ className }: PreviewTestQuestionsListProps) => {
	return (
		<CardSkeleton
			className={className}
			title="title"
			actionTitle="actionTitle"
			actionRoute="actionRoute"
		>
			<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
				{[...Array(3)].map((_, index) => (
					<PreviewListItemSkeleton key={index} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
