import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { AvatarGroupSkeleton } from '../AvatarGroup/AvatarGroupSkeleton';
import { BannerButtonSkeleton } from '../BannerButton/BannerButtonSkeleton';
import { BlockDescriptionSkeleton } from '../BlockDescription/BlockDescriptionSkeleton';
import { BlockTitleSkeleton } from '../BlockTitle/BlockTitleSkeleton';
import { StickerSkeleton } from '../Sticker/StickerSkeleton';

import styles from './BannerContent.module.css';

export const BannerContentSkeleton = () => {
	const { isMobile } = useScreenSize();

	return (
		<Flex direction="column" justify="between" className={styles['content-block']}>
			<StickerSkeleton className={styles['sticker-skill']} width={isMobile ? 176 : 236.75} />
			<Flex gap="6" direction="column" className={styles['content-wrapper']}>
				<AvatarGroupSkeleton />
				<BlockTitleSkeleton />
				<BlockDescriptionSkeleton />
				<BannerButtonSkeleton />
			</Flex>
		</Flex>
	);
};
