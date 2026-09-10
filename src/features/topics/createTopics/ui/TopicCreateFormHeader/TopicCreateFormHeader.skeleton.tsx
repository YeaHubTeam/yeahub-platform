import { BackButton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButtonSkeleton } from '@/shared/ui/FormCancelButton';

export const TopicCreateFormHeaderSkeleton = () => {
	return (
		<Flex align="center" gap="8" justify="between">
			<BackButton />
			<Flex gap="10" justify="between">
				<FormCancelButtonSkeleton />
				<ButtonSkeleton />
			</Flex>
		</Flex>
	);
};
