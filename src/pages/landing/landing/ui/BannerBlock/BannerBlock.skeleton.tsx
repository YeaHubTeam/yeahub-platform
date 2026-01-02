import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import { BannerContentSkeleton } from '../BannerContent/BannerContent.skeleton';
import { BannerImageSkeleton } from '../BannerImage/BannerImage.skeleton';

import styles from './BannerBlock.module.css';

export const BannerBlockSkeleton = () => {
	return (
		<Flex
			justify="between"
			className={classNames(styles['banner-block'], styles['banner-block-load'])}
			componentType="section"
		>
			<BannerContentSkeleton />
			<BannerImageSkeleton />
		</Flex>
	);
};
