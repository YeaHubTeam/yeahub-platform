import { EXPERIENCE_LIST } from '@/entities/profileExperience';

import { ExperienceBlockItem } from '../ExperienceBlockItem/ExperienceBlockItem';

import styles from './ExperienceBlockList.module.css';

export const ExperienceBlockList = () => {
	return (
		<div className={styles['experience-list']}>
			{EXPERIENCE_LIST.map((experience) => (
				<ExperienceBlockItem key={experience.id} experience={experience} />
			))}
		</div>
	);
};
