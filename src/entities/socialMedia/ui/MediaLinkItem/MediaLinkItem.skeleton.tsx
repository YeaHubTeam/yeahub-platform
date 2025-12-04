import { useScreenSize } from '@/shared/libs';
import { ButtonSkeleton } from '@/shared/ui/Button';
import { Flex } from '@/shared/ui/Flex';
import { IconSkeleton } from '@/shared/ui/Icon';
import { TextSkeleton } from '@/shared/ui/Text';

import styles from './MediaLinkItem.module.css';

export const MediaLinkItemSkeleton = () => {
	const { isMobileS } = useScreenSize();
	return (
		<Flex justify="between" className={styles['item']} align="center" componentType="li">
			<Flex gap="12" align="start">
				<IconSkeleton size={40} borderRadius="50%" />
				<Flex direction="column" gap="6">
					<TextSkeleton variant="body3-strong" width={120} />
					<TextSkeleton variant="body3" width={isMobileS ? 250 : 200} />
				</Flex>
			</Flex>
			<ButtonSkeleton width={170} className={styles['link']} />
		</Flex>
	);
};
