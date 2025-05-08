import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

import { i18Namespace } from '@/shared/config/i18n';
import { Landing } from '@/shared/config/i18n/i18nTranslations';

import progressBarChart from '@/widgets/NewLanding/HistoryBlock/model/assets/progressBarChart.avif';
import progressCircle from '@/widgets/NewLanding/HistoryBlock/model/assets/progressCircle.avif';
import progressCircleMobile from '@/widgets/NewLanding/HistoryBlock/model/assets/progressCircleMobile.avif';
import progressDescription from '@/widgets/NewLanding/HistoryBlock/model/assets/progressDesc.avif';

import { sliderSettings } from '../../model/constants';
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
					<HistorySlide
						src={progressCircle}
						mobileSrc={progressCircleMobile}
						alt="progress circle"
						text={t(Landing.HISTORY_SLIDES_FIRST)}
					/>
					<HistorySlide
						src={progressDescription}
						mobileSrc={progressCircleMobile}
						alt="progress description"
						text={t(Landing.HISTORY_SLIDES_SECOND)}
					/>
					<HistorySlide
						src={progressBarChart}
						mobileSrc={progressCircleMobile}
						alt="progress bar chart"
						text={t(Landing.HISTORY_SLIDES_THIRD)}
					/>
				</Slider>
			</div>
		</div>
	);
};
