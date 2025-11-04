import { Flex } from '@/shared/ui/Flex';

import { UserSelectSkeleton } from '@/entities/user';

export const SpecializationsFiltersSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<UserSelectSkeleton />
		</Flex>
	);
};
