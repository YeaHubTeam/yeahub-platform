import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { TaskAdditionalInfoDrawerSkeleton } from '../TaskAdditionalInfoDrawer/TaskAdditionalInfoDrawer.skeleton';

export const TaskHeaderSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();
	return (
		<Flex direction="column" gap="8">
			<Flex gap="10" wrap="nowrap" justify="between">
				<TextSkeleton variant="body6" width="100%" />
				{(isMobile || isTablet) && <TaskAdditionalInfoDrawerSkeleton />}
			</Flex>
		</Flex>
	);
};
