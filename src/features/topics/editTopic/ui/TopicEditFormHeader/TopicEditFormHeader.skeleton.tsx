import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButtonSkeleton } from '@/shared/ui/FormCancelButton';

export const TopicEditFormHeaderSkeleton = () => {
	return (
		<Flex align="center" gap="8" justify="between">
			<BackButtonSkeleton />
			<Flex align="center" gap="8" justify="around">
				<FormCancelButtonSkeleton />
				<ButtonSkeleton width={170} />
			</Flex>
		</Flex>
	);
};
