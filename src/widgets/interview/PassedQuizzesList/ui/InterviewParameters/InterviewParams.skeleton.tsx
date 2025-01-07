import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import { InterviewResultsSkeleton } from '../InterviewResults/InterviewResults.skeleton';

import styles from './InterviewParameters.module.css';

export const InterviewParamsSkeleton = () => {
	return (
		<Flex wrap="wrap" gap="24" className={styles.param}>
			<Flex gap="4">
				<TextSkeleton variant="body3-accent" width={40} />
				<TextSkeleton variant="body3-accent" width={85} />
			</Flex>
			<Flex gap="4">
				<TextSkeleton variant="body3-accent" width={170} />
				<TextSkeleton variant="body3-accent" width={25} />
			</Flex>
			<InterviewResultsSkeleton />
			<Flex align="center" gap="4">
				<IconSkeleton size={24} />
				<TextSkeleton variant="body3-accent" width={80} />
			</Flex>
		</Flex>
	);
};
