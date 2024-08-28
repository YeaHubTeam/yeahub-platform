import { User } from '@/entities/profile';

import styles from './UserLeftBlock.module.css';

interface props {
	info: User;
}

export const UserLeftBlock = ({ info }: props) => {
	return (
		<div className={styles['card-left']}>
			<div className={styles['card-avatar']}>
				<img src={info?.avatarUrl} alt="" />
			</div>
			<span className={styles['card-schedule']}>{'Уделенно, Part-time, Freelance'}</span>
		</div>
	);
};
