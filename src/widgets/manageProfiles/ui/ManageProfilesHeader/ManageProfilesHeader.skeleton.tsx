import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { ProfilesCounterSkeleton } from '../ProfilesCounter/ProfilesCounter.skeleton';

import styles from './ManageProfilesHeader.module.css';

interface ManageProfilesHeaderSkeletonProps {
	className?: string;
}

export const ManageProfilesHeaderSkeleton = ({ className }: ManageProfilesHeaderSkeletonProps) => {
	return (
		<Flex align="center" justify="between" className={className}>
			<TextSkeleton variant="head3" width={230} className={styles.title} />
			<ProfilesCounterSkeleton />
		</Flex>
	);
};
