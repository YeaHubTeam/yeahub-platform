import { BannerContent } from '../BannerContent/BannerContent ';
import { BannerImage } from '../BannerImage/BannerImage';

import styles from './BannerBlock.module.css';

export const BannerBlock = () => {
	return (
		<section className={styles['banner-block']}>
			<BannerContent />
			<BannerImage />
		</section>
	);
};
