import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { IconButtonSkeleton } from '@/shared/ui/IconButton';
import { TextSkeleton } from '@/shared/ui/Text';

export const TaskHeaderSkeleton = () => {
	const { isMobile, isTablet } = useScreenSize();
	return (
		<Flex justify="between" gap="10">
			<TextSkeleton variant="body6" width="100%" />
			{(isMobile || isTablet) && <IconButtonSkeleton />}
		</Flex>
	);
};
