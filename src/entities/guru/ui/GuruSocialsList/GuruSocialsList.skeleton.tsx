import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';

export const GuruSocialsListSkeleton = () => {
	return (
		<Flex gap="12">
			<IconSkeleton size={24} borderRadius="50%" />
			<IconSkeleton size={24} borderRadius="50%" />
			<IconSkeleton size={24} borderRadius="50%" />
		</Flex>
	);
};
