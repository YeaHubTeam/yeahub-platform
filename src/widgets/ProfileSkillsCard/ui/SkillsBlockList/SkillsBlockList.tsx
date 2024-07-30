import { ProfileSkill, SKILL_ITEMS } from '@/entities/profileSkill';

import { SkillsBlockItem } from '../SkillsBlockItem/SkillsBlockItem';

import styles from './SkillsBlockList.module.css';

export const SkillsBlockList = () => {
	return (
		<div className={styles['skills-list']}>
			{SKILL_ITEMS.map((skill) => (
				<SkillsBlockItem key={skill.id} skill={skill as ProfileSkill} />
			))}
		</div>
	);
};
