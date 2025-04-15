import { Skill } from '@/entities/skill';

import styles from './SkillsBlockItem.module.css';

interface SkillsBlockItemProps {
	skill: Skill;
}

export const SkillsBlockItem = ({ skill }: SkillsBlockItemProps) => {
	const { title } = skill;

	return (
		<div className={styles['skills-item']}>
			<img alt={title} src={skill.imageSrc || ''} height={20} width={20} />
			<span className={styles['skills-name']}>{title}</span>
		</div>
	);
};
