import { ButtonSkeleton } from '@/shared/ui/Button';
import { CardSkeleton } from '@/shared/ui/Card';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

export const ConfirmationTelegramSkeleton = () => {
	return (
		<CardSkeleton>
			<Flex direction="column" gap="12">
				<TextSkeleton variant="head3" width={250} />
				<TextSkeleton variant="body3" width="80%" />
				<ButtonSkeleton width={180} />
			</Flex>
		</CardSkeleton>
	);
};
