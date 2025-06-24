import { Flex } from '@/shared/ui/Flex';

import { InterviewCardSkeleton } from '../InterviewCard/InterviewCard.skeleton';

import styles from './AdditionalBlock.module.css';

export const AdditionalBlockSkeleton = () => {
	return (
		<Flex direction="column" className={styles['additional-block']}>
			<InterviewCardSkeleton />
			<InterviewCardSkeleton />
		</Flex>
	);
};
