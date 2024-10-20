import { Icon } from 'yeahub-ui-kit';

import { Skill } from '@/entities/skill';

import styles from './SkillsBlockItem.module.css';

interface SkillsBlockItemProps {
	skill: Skill;
}

export const SkillsBlockItem = ({ skill }: SkillsBlockItemProps) => {
	const { title } = skill;

	return (
		<div className={styles['skills-item']}>
			<Icon icon={'boundingBox'} height={20} width={20} className={styles['skills-icon']} />
			<span className={styles['skills-name']}>{title}</span>
		</div>
	);
};
