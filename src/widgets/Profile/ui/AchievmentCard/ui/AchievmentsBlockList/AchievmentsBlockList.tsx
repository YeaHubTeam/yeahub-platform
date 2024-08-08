import { ACHIEVMENT_LIST } from '@/entities/profileAchievment';

import { AchievmentsBlockItem } from '../AchievmentsBlockItem/AchievmentsBlockItem';

import styles from './AchievmentsBlockList.module.css';

export const AchievmentsBlockList = () => {
	return (
		<div className={styles['achievement-list']}>
			{ACHIEVMENT_LIST.map((achievment) => (
				<AchievmentsBlockItem key={achievment.id} achievement={achievment} />
			))}
		</div>
	);
};
