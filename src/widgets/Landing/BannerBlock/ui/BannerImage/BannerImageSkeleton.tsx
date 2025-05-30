import { Flex } from '@/shared/ui/Flex';

import styles from './BannerImage.module.css';

export const BannerImageSkeleton = () => {
	return (
		<div className={styles['img-block']}>
			<Flex justify="center" align="end" className={styles['img-wrapper']} />
		</div>
	);
};
