import cn from 'classnames';

import avatar1 from '@/shared/assets/images/newLanding/avatar1.avif';
import avatar2 from '@/shared/assets/images/newLanding/avatar2.avif';
import avatar3 from '@/shared/assets/images/newLanding/avatar3.avif';
import avatar4 from '@/shared/assets/images/newLanding/avatar4.avif';

import styles from './AvatarGroup.module.css';
export const AvatarGroup = () => {
	const avatars = [avatar1, avatar2, avatar3, avatar4];
	return (
		<div className={styles['avatar-group']}>
			{avatars.map((src, index) => (
				<div key={index} className={styles.avatar}>
					<img src={src} alt={`Avatar ${index}`} />
				</div>
			))}
			<div className={cn(styles.avatar, styles.count)}>1k+</div>
		</div>
	);
};
