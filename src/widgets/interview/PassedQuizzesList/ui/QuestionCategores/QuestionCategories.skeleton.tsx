import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './QuestionCategories.module.css';

export const QuestionCategoriesSkeleton = () => {
	return (
		<Flex gap="8" direction="column">
			<TextSkeleton variant="body2" width={100} />
			<ul className={styles.list}>
				{[...Array(3)].map((_, index) => {
					return (
						<li key={index} className={styles.category}>
							<Skeleton width={100} height={42} borderRadius={12} />
						</li>
					);
				})}
			</ul>
		</Flex>
	);
};
