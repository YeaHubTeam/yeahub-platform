import { CardSkeleton } from '@/shared/ui/Card';

import { TestCategoriesSkeleton } from '../TestCategories/TestCategories.skeleton';
import { TestParametersSkeleton } from '../TestParameters/TestParameters.skeleton';

import styles from './FullPassedTestsItem.module.css';

export const FullPassedTestsItemSkeleton = () => {
	return (
		<li>
			<CardSkeleton
				className={styles.container}
				title="title"
				actionTitle="actionTitle"
				actionRoute="actionRoute"
			>
				<TestParametersSkeleton />
				<TestCategoriesSkeleton />
			</CardSkeleton>
		</li>
	);
};
