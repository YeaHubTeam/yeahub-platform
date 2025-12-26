import { useTranslation } from 'react-i18next';

import { i18Namespace, Landing } from '@/shared/config';
import { Slider } from '@/shared/ui/Slider';

import { historySlides, sliderSettings } from '../../model/constants';
import { HistorySlide } from '../HistorySlide/HistorySlide';

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
