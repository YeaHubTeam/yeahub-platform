import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const TopicEditFormHeaderSkeleton = () => {
	return (
		<Flex align="center" gap="8" justify="between">
			<BackButtonSkeleton />
			<Flex align="center" gap="8" justify="around">
				<ButtonSkeleton width={170} />
				<ButtonSkeleton width={170} />
			</Flex>
		</Flex>
	);
};
