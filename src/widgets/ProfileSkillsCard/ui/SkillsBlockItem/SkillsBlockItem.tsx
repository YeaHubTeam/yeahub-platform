import { FC } from 'react';
import { Icon } from 'yeahub-ui-kit';

import { ProfileSkill } from '@/entities/profileSkill';

import styles from './SkillsBlockItem.module.css';

interface Props {
	skill: ProfileSkill;
}

export const SkillsBlockItem: FC<Props> = ({ skill }) => {
	const { name, iconName } = skill;

	return (
		<div className={styles['skills-item']}>
			<Icon icon={iconName} height={20} width={20} className={styles['skills-icon']} />
			<span className={styles['skills-name']}>{name}</span>
		</div>
	);
};
