import { Flex } from '@/shared/ui/Flex';
import { StatusChipSkeleton } from '@/shared/ui/StatusChip';

export const UserRolesListSkeleton = () => {
	return (
		<Flex gap="12" align="start" wrap="wrap" dataTestId="UserRolesList">
			{Array.from({ length: 2 }).map((_, index) => (
				<StatusChipSkeleton key={index} />
			))}
		</Flex>
	);
};
