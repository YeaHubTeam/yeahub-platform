import { Flex } from '@/shared/ui/Flex';
import { Slider } from '@/shared/ui/Slider';

import { interviewMaterialsSliderSettings } from '../../model/constants';
import { About } from '../About/About';
import { FiltersCard } from '../Cards/FiltersCard/FiltersCard';
import { SkillsCard } from '../Cards/SkillsCard/SkillsCard';
import { SpecializationCard } from '../Cards/SpecializationCard/SpecializationCard';

import styles from './InterviewMaterials.module.css';

export const InterviewMaterials = () => {
	return (
		<Flex className={styles.content} dataTestId={'InterviewMaterials_content'}>
			<About />
			<div className={styles.cards} data-testid={'InterviewMaterials_cards'}>
				<Slider {...interviewMaterialsSliderSettings} className={styles['slider-container']}>
					<SpecializationCard />
					<SkillsCard />
					<FiltersCard />
				</Slider>
			</div>
		</Flex>
	);
};
