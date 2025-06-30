import classNames from 'classnames';

import { Slider } from '@/shared/ui/Slider';

import { sliderSettings } from '../../model/constants';
import { HistorySlideSkeleton } from '../HistorySlide/HistorySlide.skeleton';

import styles from './HistorySliderBlock.module.css';

export const HistorySliderBlockSkeleton = () => {
	const historySlides = new Array(3).fill(null);

	return (
		<div className={classNames(styles['slider-block'], styles['slider-block-loader'])}>
			<div className={styles['image-slider-container']}>
				<Slider {...sliderSettings}>
					{historySlides.map((_, index) => (
						<HistorySlideSkeleton key={index} />
					))}
				</Slider>
			</div>
		</div>
	);
};
