import { Block } from '@/shared/ui/Block';

import { UserInfo } from '../UserCardInfo/UserInfo';
import { UserLeftBlock } from '../UserCardLeftBlock/UserLeftBlock';

import styles from './UserCard.module.css';

export const UserCard = () => {
	return (
		<Block>
			<div className={styles.card}>
				<UserLeftBlock />
				<UserInfo />
			</div>
		</Block>
	);
};
