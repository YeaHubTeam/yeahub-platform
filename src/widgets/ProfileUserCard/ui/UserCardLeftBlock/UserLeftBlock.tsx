import { USER_INFO } from '@/entities/user';

import styles from './UserLeftBlock.module.css';

export const UserLeftBlock = () => {
	const { img, schedule } = USER_INFO;

	return (
		<div className={styles['card-left']}>
			<div className={styles['card-avatar']}>
				<img src={img} alt="" />
			</div>
			<span className={styles['card-schedule']}>{schedule}</span>
		</div>
	);
};
