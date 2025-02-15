import { Flex } from '@/shared/ui/Flex';
import { Skeleton } from '@/shared/ui/Skeleton';

export const UserPreferencesSkeleton = () => (
	<Flex align={'center'} gap={'16'}>
		<Skeleton width={'32px'} height={'32px'} />
		<Skeleton width={'70px'} height={'30px'} />
		<Skeleton width={'40px'} height={'40px'} />
	</Flex>
);
