import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import { historySlides, sliderSettings } from '../../model/constants';
import { HistorySlide } from '../HistorySlide/HistorySlide';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './HistorySliderBlock.module.css';

export const HistorySliderBlock = () => {
	const { t } = useTranslation(i18Namespace.landing);

	return (
		<div className={styles['slider-block']}>
			<div className={styles['image-slider-container']}>
				<Slider {...sliderSettings}>
					{historySlides.map((slide) => (
						<HistorySlide
							key={slide.id}
							src={slide.src}
							alt={t(Landing[slide.altKey as keyof typeof Landing])}
							text={t(Landing[slide.textKey as keyof typeof Landing])}
						/>
					))}
				</Slider>
			</div>
		</div>
	);
};
