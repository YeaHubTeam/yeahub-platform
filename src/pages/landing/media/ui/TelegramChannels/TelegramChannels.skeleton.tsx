import { useScreenSize } from '@/shared/libs';
import { Flex } from '@/shared/ui/Flex';
import { TextSkeleton } from '@/shared/ui/Text';

import { MediaLinksListSkeleton } from '@/entities/socialMedia';

import styles from './TelegramChannels.module.css';

export const TelegramChannelsSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" gap="12">
			<TextSkeleton variant={isMobile ? 'body5-accent' : 'head3'} width={250} />
			<TextSkeleton
				variant="body3"
				className={styles['description']}
				width={isMobile ? '100%' : '60%'}
			/>
			<MediaLinksListSkeleton />
		</Flex>
	);
};
