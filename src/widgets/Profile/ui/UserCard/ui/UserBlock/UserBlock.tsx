import { Block } from '@/shared/ui/Block';

import { UserInfo } from '../UserBlockInfo/UserInfo';
import { UserLeftBlock } from '../UserBlockLeft/UserLeftBlock';

import styles from './UserBlock.module.css';

export const UserBlock = () => {
	return (
		<Block>
			<div className={styles.card}>
				<UserLeftBlock />
				<UserInfo />
			</div>
		</Block>
	);
};
