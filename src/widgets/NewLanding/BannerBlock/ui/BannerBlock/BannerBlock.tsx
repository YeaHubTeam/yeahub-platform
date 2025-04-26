import { Flex } from '@/shared/ui/Flex';

import { BannerContent } from '../BannerContent/BannerContent';
import { BannerImage } from '../BannerImage/BannerImage';

import styles from './BannerBlock.module.css';

export const BannerBlock = () => {
	return (
		<Flex justify="between" className={styles['banner-block']} componentType="section">
			<BannerContent />
			<BannerImage />
		</Flex>
	);
};
