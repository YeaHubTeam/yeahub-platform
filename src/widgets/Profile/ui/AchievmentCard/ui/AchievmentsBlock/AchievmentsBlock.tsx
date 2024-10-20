import { Card } from '@/shared/ui/Card';

import { AchievmentsBlockHeader } from '../AchievmentsBlockHeader/AchievmentsBlockHeader';
import { AchievmentsBlockList } from '../AchievmentsBlockList/AchievmentsBlockList';

import styles from './AchievmentsBlock.module.css';

export const AchievmentsBlock = () => {
	return (
		<Card>
			<div className={styles['achievement']}>
				<AchievmentsBlockHeader />
				<AchievmentsBlockList />
			</div>
		</Card>
	);
};
