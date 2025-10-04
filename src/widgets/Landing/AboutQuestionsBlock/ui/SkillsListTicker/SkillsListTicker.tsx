import { Slider } from '@/shared/ui/Slider';

import { skillsList, skillsTickerSliderSettings } from '../../model/constants';
import { SkillChip } from '../SkillChip/SkillChip';

import styles from './SkillsListTicker.module.css';

export const SkillsListTicker = () => {
	return (
		<div className={`${styles.list} padding6`} data-testid="SkillsListTicker_List">
			<Slider {...skillsTickerSliderSettings} className={styles['slider-container']}>
				{skillsList.map(({ src, alt }, index) => (
					<SkillChip key={index} src={src} alt={alt} showLabel />
				))}
			</Slider>
		</div>
	);
};
