import Slider from 'react-slick';

import { skillsList, skillsTickerSliderSettings } from '../../model/constants';
import { SkillChip } from '../SkillChip/SkillChip';

import styles from './SkillsListTicker.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const SkillsListTicker = () => {
	return (
		<div className={styles.list}>
			<Slider {...skillsTickerSliderSettings} className={styles['slider-container']}>
				{skillsList.map(({ src, alt }, index) => (
					<SkillChip key={index} src={src} alt={alt} showLabel />
				))}
			</Slider>
		</div>
	);
};
