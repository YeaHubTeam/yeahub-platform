import { useTranslation } from 'react-i18next';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

import company from '@/widgets/NewLanding/BannerBlock/model/assets/company.avif';
import personImg from '@/widgets/NewLanding/BannerBlock/model/assets/personImg.avif';
import progress from '@/widgets/NewLanding/BannerBlock/model/assets/progress.avif';
import statistics from '@/widgets/NewLanding/BannerBlock/model/assets/statistics.avif';

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
