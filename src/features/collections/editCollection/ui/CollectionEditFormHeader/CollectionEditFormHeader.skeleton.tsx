import { BackHeaderSkeleton } from '@/shared/ui/BackHeader';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const CollectionEditFormHeaderSkeleton = () => {
	return (
		<Flex gap="16">
			<BackHeaderSkeleton>
				<ButtonSkeleton width={141} />
				<ButtonSkeleton width={148} />
			</BackHeaderSkeleton>
		</Flex>
	);
};
