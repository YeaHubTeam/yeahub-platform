import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const TelegramLoginSkeleton = () => {
	return (
		<Flex direction="column" gap="8" align="center">
			<TextSkeleton variant="body2" width={200} />
			<ButtonSkeleton width={238} />
		</Flex>
	);
};
