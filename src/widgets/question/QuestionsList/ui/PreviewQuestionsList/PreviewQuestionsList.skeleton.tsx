import { useScreenSize } from '@/shared/hooks';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';

import { PreviewQuestionsItemSkeleton } from '../PreviewQuestionsItem/PreviewQuestionsItem.skeleton';

import { PreviewQuestionsListProps } from './PreviewQuestionsList';
import styles from './PreviewQuestionsList.module.css';

export const PreviewQuestionsListSkeleton = ({ className }: PreviewQuestionsListProps) => {
	const { isMobile } = useScreenSize();
	return (
		<CardSkeleton
			className={className}
			title="title"
			actionTitle="actionTitle"
			actionRoute="actionRoute"
			withShadow
			isTitleCenter={isMobile}
		>
			<Flex componentType="ul" direction="column" gap="12" className={styles.list}>
				{[...Array(3)].map((_, index) => (
					<PreviewQuestionsItemSkeleton key={index} />
				))}
			</Flex>
		</CardSkeleton>
	);
};
