import { CardSkeleton } from '@/shared/ui/Card';

import { PassedQuestionsItemSkeleton } from '../PassedQuestionsItem/PassedQuestionsItem.skeleton';

import { PassedQuestionsListProps } from './PassedQuestionsList';
import styles from './PassedQuestionsList.module.css';

export const PassedQuestionsListSkeleton = ({ className }: PassedQuestionsListProps) => {
	return (
		<CardSkeleton className={className} isTitleCenter title="title">
			<ul className={styles.list}>
				{[...Array(6)].map((_, index) => (
					<PassedQuestionsItemSkeleton key={index} />
				))}
			</ul>
		</CardSkeleton>
	);
};
