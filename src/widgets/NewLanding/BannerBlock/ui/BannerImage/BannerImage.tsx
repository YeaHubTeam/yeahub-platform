import { useTranslation } from 'react-i18next';

import company from '@/shared/assets/images/newLanding/company.avif';
import personImg from '@/shared/assets/images/newLanding/personImg.avif';
import progress from '@/shared/assets/images/newLanding/progress.avif';
import statistics from '@/shared/assets/images/newLanding/statistics.avif';
import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';
import { Flex } from '@/shared/ui/Flex';

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
					alt="Улыбающийся пользователь, использующий наш продукт"
					fetchPriority="high"
				/>
				<img className={styles.statistics} src={statistics} alt="Статистика" fetchPriority="high" />
				<img className={styles.company} src={company} alt="Компания" fetchPriority="high" />
				<img className={styles.progress} src={progress} alt="Прогресс" fetchPriority="high" />
				<Sticker
					text={t(Landing.BANNER_STICKER_CANDIDATE)}
					classNames={styles['sticker-candidate']}
				/>
			</Flex>
		</div>
	);
};
