import { FC } from 'react';

import { ProfileAchievment } from '@/entities/profileAchievment';

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
