import { NavLink } from 'react-router-dom';
import { Icon, IconButton } from 'yeahub-ui-kit';

import Avatar from '@/shared/assets/images/MockAvatar.png';

import styles from './UserPreferences.module.css';

export const UserPreferences = () => {
	return (
		<div className={styles.preferences}>
			<div>
				<IconButton
					aria-label="Large"
					disabled
					form="square"
					icon={<Icon icon="gearSix" size={20} />}
					size="small"
					theme="tertiary"
				/>
			</div>
			<NavLink to="/" className={styles.avatar}>
				<img className={styles.img} src={Avatar} alt="avatar" />
			</NavLink>
		</div>
	);
};
