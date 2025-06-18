import { useScreenSize } from '@/shared/hooks';
import { Flex } from '@/shared/ui/Flex';

import { AvatarGroupSkeleton } from '../AvatarGroup/AvatarGroup.skeleton';
import { BannerButtonSkeleton } from '../BannerButton/BannerButton.skeleton';
import { BlockDescriptionSkeleton } from '../BlockDescription/BlockDescription.skeleton';
import { BlockTitleSkeleton } from '../BlockTitle/BlockTitle.skeleton';
import { StickerSkeleton } from '../Sticker/Sticker.skeleton';

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
