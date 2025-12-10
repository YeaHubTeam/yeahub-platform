import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { ProgressBarSkeleton } from '@/shared/ui/ProgressBar';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './MostDifficultQuestionItem.module.css';

export const MostDifficultQuestionItemSkeleton = () => {
	return (
		<CardSkeleton withOutsideShadow size="small" className={styles['card']}>
			<Flex justify="between" direction="column" gap="12">
				<Flex justify="between" gap="10">
					<TextSkeleton width={200} variant="body3-accent" />
					<TextSkeleton width={30} variant="body3-accent" />
				</Flex>
				<ProgressBarSkeleton currentCount={1} totalCount={1} variant="medium" />
			</Flex>
		</CardSkeleton>
	);
};
