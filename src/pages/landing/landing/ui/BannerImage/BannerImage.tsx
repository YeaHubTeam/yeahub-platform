import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { Flex } from '@/shared/ui/Flex';

import { company, personImg, statistics, progress } from '../../model/assets';
import { Sticker } from '../Sticker/Sticker';

import styles from './BannerImage.module.css';

export const BannerImage = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<div className={styles['img-block']}>
			<Flex justify="center" align="end" className={styles['img-wrapper']}>
				<img
					className={styles.wallpaper}
					src={personImg}
					alt={t(Landing.BANNER_IMG_HOMEPAGE)}
					fetchPriority="high"
				/>
				<img
					className={styles.statistics}
					src={statistics}
					alt={t(Landing.BANNER_IMG_STATISTICS)}
					fetchPriority="high"
				/>
				<img
					className={styles.company}
					src={company}
					alt={t(Landing.BANNER_IMG_COMPANY)}
					fetchPriority="high"
				/>
				<img
					className={styles.progress}
					src={progress}
					alt={t(Landing.BANNER_IMG_PROGRESS)}
					fetchPriority="high"
				/>
				<Sticker
					text={t(Landing.BANNER_STICKER_CANDIDATE)}
					className={styles['sticker-candidate']}
				/>
			</Flex>
		</div>
	);
};
