import { Skill } from '@/entities/skill';

import { SkillsBlockItem } from '../SkillsBlockItem/SkillsBlockItem';

import styles from './SkillsBlockList.module.css';

interface props {
	skillsList: Skill[];
}

export const SkillsBlockList = ({ skillsList }: props) => {
	return (
		<div className={styles['skills-list']}>
			{skillsList.map((skill) => (
				<SkillsBlockItem key={skill.id} skill={skill as Skill} />
			))}
		</div>
	);
};
