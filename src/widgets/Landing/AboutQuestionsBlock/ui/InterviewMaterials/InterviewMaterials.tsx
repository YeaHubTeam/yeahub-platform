import { Flex } from '@/shared/ui/Flex';

import { FiltersCard } from '@/widgets/Landing/AboutQuestionsBlock/ui/Cards/FiltersCard/FiltersCard';

import { About } from '../About/About';
import { SkillsCard } from '../Cards/SkillsCard/SkillsCard';
import { SpecializationCard } from '../Cards/SpecializationCard/SpecializationCard';

import styles from './InterviewMaterials.module.css';

export const InterviewMaterials = () => {
	return (
		<Flex className={styles.content}>
			<About />
			<Flex gap={'20'} className={styles.cards}>
				<SpecializationCard />
				<SkillsCard />
				<FiltersCard />
			</Flex>
		</Flex>
	);
};
