import { Flex } from '@/shared/ui/Flex';

import { ProfileCardSkeleton } from '../ProfileCard/ProfileCard.skeleton';

interface ProfilesListSkeletonProps {
	className?: string;
	count?: number;
}

export const ProfilesListSkeleton = ({ className, count = 3 }: ProfilesListSkeletonProps) => {
	return (
		<Flex direction="column" gap="14" className={className}>
			{Array.from({ length: count }).map((_, index) => (
				<ProfileCardSkeleton key={index} />
			))}
		</Flex>
	);
};
