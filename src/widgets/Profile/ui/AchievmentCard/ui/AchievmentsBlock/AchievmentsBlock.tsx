import { Block } from '@/shared/ui/Block';

import { AchievmentsBlockHeader } from '../AchievmentsBlockHeader/AchievmentsBlockHeader';
import { AchievmentsBlockList } from '../AchievmentsBlockList/AchievmentsBlockList';

import styles from './AchievmentsBlock.module.css';

export const AchievmentsBlock = () => {
	return (
		<Block>
			<div className={styles['achievement']}>
				<AchievmentsBlockHeader />
				<AchievmentsBlockList />
			</div>
		</Block>
	);
};
