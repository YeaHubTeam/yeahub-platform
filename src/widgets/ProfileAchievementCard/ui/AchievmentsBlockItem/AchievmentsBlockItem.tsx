import { FC } from 'react';

import type { ProfileAchievment } from '@/entities/achievement';

import styles from './AchievmentsBlockItem.module.css';

interface Props {
	achievement: ProfileAchievment;
}

export const AchievmentsBlockItem: FC<Props> = ({ achievement }) => {
	const { img } = achievement;

	return (
		<div className={styles['achievement-item']}>
			<img src={img} alt="" />
		</div>
	);
};
