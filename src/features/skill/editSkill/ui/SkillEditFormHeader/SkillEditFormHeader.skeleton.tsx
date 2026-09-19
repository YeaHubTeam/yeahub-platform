import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { Flex } from '@/shared/ui/Flex';
import { FormCancelButtonSkeleton } from '@/shared/ui/FormCancelButton';

export const SkillEditFormHeaderSkeleton = () => {
	return (
		<Flex align="center" gap="8" justify="between">
			<BackButtonSkeleton />
			<Flex align="center" gap="8" justify="around">
				<FormCancelButtonSkeleton />
				<FormCancelButtonSkeleton />
			</Flex>
		</Flex>
	);
};
