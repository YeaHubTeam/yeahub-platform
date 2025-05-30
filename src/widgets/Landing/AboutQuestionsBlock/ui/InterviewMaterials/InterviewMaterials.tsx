import { Flex } from '@/shared/ui/Flex';
import { Slider } from '@/shared/ui/Slider';

import { FiltersCard } from '@/widgets/Landing/AboutQuestionsBlock/ui/Cards/FiltersCard/FiltersCard';

import { interviewMaterialsSliderSettings } from '../../model/constants';
import { About } from '../About/About';
import { SkillsCard } from '../Cards/SkillsCard/SkillsCard';
import { SpecializationCard } from '../Cards/SpecializationCard/SpecializationCard';

import styles from './InterviewMaterials.module.css';

export const InterviewMaterials = () => {
	return (
		<Flex className={styles.content}>
			<About />
			<div className={styles.cards}>
				<Slider {...interviewMaterialsSliderSettings} className={styles['slider-container']}>
					<SpecializationCard />
					<SkillsCard />
					<FiltersCard />
				</Slider>
			</div>
		</Flex>
	);
};
