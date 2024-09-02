import type { ProfileAchievment } from '@/entities/achievement';

import styles from './AchievmentsBlockItem.module.css';

interface AchievmentsBlockItemProps {
	achievement: ProfileAchievment;
}

export const AchievmentsBlockItem = ({ achievement }: AchievmentsBlockItemProps) => {
	const { img } = achievement;

	return (
		<div className={styles['achievement-item']}>
			<img src={img} alt="" />
		</div>
	);
};
