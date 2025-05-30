import classNames from 'classnames';

import { Flex } from '@/shared/ui/Flex';

import { BannerContentSkeleton } from '@/widgets/Landing/BannerBlock/ui/BannerContent/BannerContentSkeleton';

import { BannerImageSkeleton } from '../BannerImage/BannerImageSkeleton';

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
