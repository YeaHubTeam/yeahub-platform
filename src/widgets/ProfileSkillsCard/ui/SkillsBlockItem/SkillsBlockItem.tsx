import { Icon } from 'yeahub-ui-kit';

import type { ProfileSkill } from '@/entities/skill';

import styles from './SkillsBlockItem.module.css';

interface SkillsBlockItemProps {
	skill: ProfileSkill;
}

export const SkillsBlockItem = ({ skill }: SkillsBlockItemProps) => {
	const { name, iconName } = skill;

	return (
		<div className={styles['skills-item']}>
			<Icon icon={iconName} height={20} width={20} className={styles['skills-icon']} />
			<span className={styles['skills-name']}>{name}</span>
		</div>
	);
};
