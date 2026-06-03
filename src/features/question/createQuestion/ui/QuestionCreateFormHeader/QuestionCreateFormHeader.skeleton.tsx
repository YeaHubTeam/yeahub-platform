import { BackButtonSkeleton } from '@/shared/ui/BackButton';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';

export const QuestionCreateFormHeaderSkeleton = () => {
	return (
		<Flex align="center" gap="8" justify="between">
			<BackButtonSkeleton />
			<ButtonSkeleton width={146} />
		</Flex>
	);
};
