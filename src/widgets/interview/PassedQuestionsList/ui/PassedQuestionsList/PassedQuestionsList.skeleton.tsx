import { CardSkeleton } from '@/shared/ui/Card';

import styles from '@/widgets/interview/PassedQuestionsList/ui/PassedQuestionsList/PassedQuestionsList.module.css';

import { PassedQuestionsItemSkeleton } from '../PassedQuestionsItem/PassedQuestionsItem.skeleton';

import { PassedQuestionsListProps } from './PassedQuestionsList';

export const PassedQuestionsListSkeleton = ({ className }: PassedQuestionsListProps) => {
	return (
		<CardSkeleton className={className} isTitleCenter title="title">
			<ul className={styles.list}>
				{[...Array(8)].map((_, index) => (
					<PassedQuestionsItemSkeleton key={index} />
				))}
			</ul>
		</CardSkeleton>
	);
};
