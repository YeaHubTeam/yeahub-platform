import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButtonSkeleton } from '@/shared/ui/FormCancelButton';

export const SpecializationCreateFormHeaderSkeleton = () => {
	return (
		<Flex align="center" gap="8" justify="between">
			<BackButtonSkeleton />
			<Flex gap="10" justify="between">
				<FormCancelButtonSkeleton />
				<ButtonSkeleton width={148} />
			</Flex>
		</Flex>
	);
};
