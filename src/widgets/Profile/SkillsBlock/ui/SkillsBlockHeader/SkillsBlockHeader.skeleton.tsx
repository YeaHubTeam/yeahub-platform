import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

import { UserEditButtonSkeleton } from '@/entities/user';

export const SkillsBlockHeaderSkeleton = ({ isEdit }: { isEdit?: boolean }) => {
	return (
		<Flex gap="16" justify="between">
			<Skeleton width={81} height={27} />
			{isEdit && <UserEditButtonSkeleton />}
		</Flex>
	);
};
