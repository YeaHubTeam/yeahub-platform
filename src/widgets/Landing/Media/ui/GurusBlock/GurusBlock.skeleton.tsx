import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { GurusListSkeleton } from '@/entities/guru';

export const GurusBlockSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap="12">
			<TextSkeleton variant={isMobile ? 'body5-accent' : 'head3'} width={150} />
			<TextSkeleton variant="body3" width={'100%'} />
			<GurusListSkeleton variant="list-with-borders" />
		</Flex>
	);
};
