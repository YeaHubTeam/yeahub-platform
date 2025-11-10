import { Flex } from '@/shared/ui/Flex';

import { UserRolesListFieldSkeleton } from '../UserRolesListField/UserRolesListField.skeleton';

export const UsersFiltersSkeleton = () => {
	return (
		<Flex direction="column" gap="24">
			<UserRolesListFieldSkeleton />
		</Flex>
	);
};
