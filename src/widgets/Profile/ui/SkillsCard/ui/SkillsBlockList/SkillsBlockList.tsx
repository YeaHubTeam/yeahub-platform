import { Skill } from '@/entities/skill';

import { SkillsBlockItem } from '../SkillsBlockItem/SkillsBlockItem';

import styles from './SkillsBlockList.module.css';

interface SkillsBlockListProps {
	skillsList: Skill[];
}

export const SkillsBlockList = ({ skillsList }: SkillsBlockListProps) => {
	return (
		<div className={styles['skills-list']}>
			{skillsList.map((skill) => (
				<SkillsBlockItem key={skill.id} skill={skill} />
			))}
		</div>
	);
};
