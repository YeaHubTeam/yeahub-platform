import Slider from 'react-slick';

import { Flex } from '@/shared/ui/Flex';

import { interviewMaterialsSliderSettings } from '../../model/constants';
import { AboutSkeleton } from '../About/About.skeleton';
import { FiltersCardSkeleton } from '../Cards/FiltersCard/FiltersCard.skeleton';
import { SkillsCardSkeleton } from '../Cards/SkillsCard/SkillsCard.skeleton';
import { SpecializationCardSkeleton } from '../Cards/SpecializationCard/SpecializationCard.skeleton';

import styles from './InterviewMaterials.module.css';

export const InterviewMaterialsSkeleton = () => {
	return (
		<Flex className={styles.content}>
			<AboutSkeleton />
			<div className={styles.cards}>
				<Slider {...interviewMaterialsSliderSettings} className={styles['slider-container']}>
					<SpecializationCardSkeleton />
					<SkillsCardSkeleton />
					<FiltersCardSkeleton />
				</Slider>
			</div>
		</Flex>
	);
};
