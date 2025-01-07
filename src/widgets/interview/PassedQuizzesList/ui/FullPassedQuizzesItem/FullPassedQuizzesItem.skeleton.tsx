import { CardSkeleton } from '@/shared/ui/Card';

import { InterviewParamsSkeleton } from '../InterviewParameters/InterviewParams.skeleton';
import { QuestionCategoriesSkeleton } from '../QuestionCategores/QuestionCategories.skeleton';

import styles from './FullPassedQuizzesItem.module.css';

export const FullPassedQuizzesItemSkeleton = () => {
	return (
		<li>
			<CardSkeleton
				className={styles.container}
				title="title"
				actionTitle="actionTitle"
				actionRoute="actionRoute"
			>
				<InterviewParamsSkeleton />
				<QuestionCategoriesSkeleton />
			</CardSkeleton>
		</li>
	);
};
