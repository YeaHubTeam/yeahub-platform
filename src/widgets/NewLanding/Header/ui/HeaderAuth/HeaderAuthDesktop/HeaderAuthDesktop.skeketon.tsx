import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const HeaderAuthDesktopSkeleton = () => {
	return (
		<Flex justify="between" align="center" gap="26">
			<ButtonSkeleton size="small" width={40} />
			<ButtonSkeleton size="large" width={171} />
		</Flex>
	);
};
