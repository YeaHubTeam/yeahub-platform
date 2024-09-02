import { ACHIEVMENT_LIST } from '@/entities/achievement';

import styles from './AchievmentsBlockHeader.module.css';

export const AchievmentsBlockHeader = () => {
	return (
		<div className={styles['achievement-header']}>
			<h3 className={styles['achievement-title']}>{`Достижения (${ACHIEVMENT_LIST.length})`}</h3>
		</div>
	);
};
